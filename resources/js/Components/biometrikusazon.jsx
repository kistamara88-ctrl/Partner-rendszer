import Webpass from "@laragear/webpass";

export default function BiometricRegister() {
    const register = async () => {
        try {
            const csrf = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            console.log("CSRF:", csrf);

            const webpass = Webpass.create({
                routes: {
                    attestOptions: "/webauthn/register/options",
                    attest: "/webauthn/register",
                    assertOptions: "/webauthn/login/options",
                    assert: "/webauthn/login",
                },
                headers: {
                    "X-CSRF-TOKEN": csrf,
                    "X-Requested-With": "XMLHttpRequest",
                },
                credentials: "same-origin",
            });

            console.log(webpass);

            const result = await webpass.attest();

            console.log(result);

            alert("Siker!");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <button onClick={register}>
            Biometrikus azonosító hozzáadása
        </button>
    );
}