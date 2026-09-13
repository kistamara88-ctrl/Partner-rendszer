import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import BiometrikusAzon from "@/Components/biometrikusazon";

export default function Profile({ user, shippingMethods = [], paymentMethods = [] }) {
    const { data, setData, patch, processing, errors } = useForm({
        shipping_postal_code: user.shipping_postal_code || "",
        city: user.city || "",
        address: user.address || "",
        shipping_method: user.shipping_method || "",

        billing_postal_code: user.billing_postal_code || "",
        billing_city: user.billing_city || "",
        billing_address: user.billing_address || "",
        payment_method: user.payment_method || "",
    });

    const [sameAddress, setSameAddress] = useState(false);

    useEffect(() => {
        if (!sameAddress) return;

        setData((current) => ({
            ...current,
            billing_postal_code: current.shipping_postal_code,
            billing_city: current.city,
            billing_address: current.address,
        }));
    }, [sameAddress, data.shipping_postal_code, data.city, data.address]);

    function submit(e) {
        e.preventDefault();
        patch("/partner/profile");
    }

    return (
        <div style={{ padding: "20px", maxWidth: "600px" }}>
            <form onSubmit={submit}>
                <h1>Szállítási adatok</h1>

                <div>
                    <label>Irányítószám</label><br />
                    <input
                        value={data.shipping_postal_code}
                        onChange={e => setData("shipping_postal_code", e.target.value)}
                    />
                    {errors.shipping_postal_code && <div>{errors.shipping_postal_code}</div>}
                </div>

                <br />

                <div>
                    <label>Város</label><br />
                    <input
                        value={data.city}
                        onChange={e => setData("city", e.target.value)}
                    />
                    {errors.city && <div>{errors.city}</div>}
                </div>

                <br />

                <div>
                    <label>Cím</label><br />
                    <input
                        value={data.address}
                        onChange={e => setData("address", e.target.value)}
                    />
                    {errors.address && <div>{errors.address}</div>}
                </div>

                <br />

                <div>
                    <label>Alapértelmezett szállítási mód</label><br />
                    <select
                        value={data.shipping_method}
                        onChange={e => setData("shipping_method", e.target.value)}
                    >
                        <option value="">Válassz szállítási módot</option>
                        {shippingMethods.map(method => (
                            <option key={method} value={method}>{method}</option>
                        ))}
                    </select>
                    {errors.shipping_method && <div>{errors.shipping_method}</div>}
                </div>

                <br />

                <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <input
                        type="checkbox"
                        checked={sameAddress}
                        onChange={e => setSameAddress(e.target.checked)}
                    />
                    A szállítási és a fizetési adatok megegyeznek
                </label>

                <br />

                <h1>Fizetési adatok</h1>

                <div>
                    <label>Irányítószám</label><br />
                    <input
                        value={data.billing_postal_code}
                        onChange={e => setData("billing_postal_code", e.target.value)}
                        disabled={sameAddress}
                    />
                    {errors.billing_postal_code && <div>{errors.billing_postal_code}</div>}
                </div>

                <br />

                <div>
                    <label>Város</label><br />
                    <input
                        value={data.billing_city}
                        onChange={e => setData("billing_city", e.target.value)}
                        disabled={sameAddress}
                    />
                    {errors.billing_city && <div>{errors.billing_city}</div>}
                </div>

                <br />

                <div>
                    <label>Cím</label><br />
                    <input
                        value={data.billing_address}
                        onChange={e => setData("billing_address", e.target.value)}
                        disabled={sameAddress}
                    />
                    {errors.billing_address && <div>{errors.billing_address}</div>}
                </div>

                <br />

                <div>
                    <label>Alapértelmezett fizetési mód</label><br />
                    <select
                        value={data.payment_method}
                        onChange={e => setData("payment_method", e.target.value)}
                    >
                        <option value="">Válassz fizetési módot</option>
                        {paymentMethods.map(method => (
                            <option key={method} value={method}>{method}</option>
                        ))}
                    </select>
                    {errors.payment_method && <div>{errors.payment_method}</div>}
                </div>

                <br />

                <button type="submit" disabled={processing}>
                    {processing ? "Mentés..." : "Mentés"}
                </button>
            </form>

            <hr style={{ margin: "30px 0" }} />
            <h2>Biometrikus azonosítás</h2>
            <BiometrikusAzon />
        </div>
    );
}