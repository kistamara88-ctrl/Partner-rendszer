import Webpass from "@laragear/webpass";
import { useState } from "react";

export default function BiometricRegister() {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [processing, setProcessing] = useState(false);

    const register = async () => {
        setMessage("");
        setError("");
        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");

        if (Webpass.isUnsupported()) {
            setError("Ez a bongeszo vagy eszkoz nem tamogatja a biometrikus azonositast.");
            return;
        }

        if (window.location.protocol !== "https:" && window.location.hostname !== "localhost") {
            setError("Biometrikus azonositashoz nyisd meg az oldalt itt: http://localhost:8000/profile");
            return;
        }

        if (!csrfToken) {
            setError("Hianyzik a CSRF token az oldalrol.");
            return;
        }

        setProcessing(true);

        try {
            const result = await Webpass.create({
                credentials: "same-origin",
            }).attest({
                path: route("webauthn.register.options"),
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "X-Requested-With": "XMLHttpRequest",
                },
            }, {
                path: route("webauthn.register"),
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "X-Requested-With": "XMLHttpRequest",
                },
            });

            if (result.success) {
                setMessage("Biometrikus azonosito hozzaadva.");
                return;
            }

            setError(result.error?.message || "Nem sikerult hozzaadni a biometrikus azonositot.");
        } catch (error) {
            setError(error.message || "Nem sikerult hozzaadni a biometrikus azonositot.");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div>
            <button
                type="button"
                onClick={register}
                disabled={processing}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
            >
                {processing ? "Hozzaadas..." : "Biometrikus azonosito hozzaadasa"}
            </button>

            {message && (
                <div className="mt-2 text-sm text-green-600">
                    {message}
                </div>
            )}

            {error && (
                <div className="mt-2 text-sm text-red-600">
                    {error}
                </div>
            )}
        </div>
    );
}
