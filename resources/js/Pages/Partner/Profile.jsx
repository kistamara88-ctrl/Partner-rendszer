import { useForm } from "@inertiajs/react";
import BiometrikusAzon from "@/Components/biometrikusazon";

export default function Profile({ user }) {
    const { data, setData, patch, processing } = useForm({
        shipping_postal_code: user.shipping_postal_code || "",
        city: user.city || "",
        address: user.address || "",
        shipping_method: user.shipping_method || "",
        
        billing_postal_code: user.billing_postal_code ||"",
        billing_city: user.billing_city || "",
        billing_address: user.billing_address || "",
        payment_method: user.payment_method || "",
    });

    function submit(e) {
        e.preventDefault();

        patch("/partner/profile");
    }

    return (
        <div style={{ padding: "20px", maxWidth: "600px" }}>
            <h1>Szállítási adatok</h1>
            
            

                <div>
                    <label>Irányítószám</label><br />
                    <input
                        value={data.shipping_postal_code}
                        onChange={e => setData("shipping_postal_code", e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Város</label><br />
                    <input
                        value={data.city}
                        onChange={e => setData("city", e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Cím</label><br />
                    <input
                        value={data.address}
                        onChange={e => setData("address", e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Alapértelmezett szállítási mód</label><br />
                    <input
                        value={data.shipping_method}
                        onChange={e => setData("shipping_method", e.target.value)}
                    />
                </div>

                <br />

                

                <h1>Fizetési adatok</h1>

                <div><label>Irányítószám</label><br />
                    <input
                        value={data.billing_postal_code}
                        onChange={e => setData("billing_postal_code", e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Város</label><br />
                    <input
                        value={data.billing_city}
                        onChange={e => setData("billing_city", e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Cím</label><br />
                    <input
                        value={data.billing_address}
                        onChange={e => setData("billing_address", e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Alapértelmezett fizetési mód</label><br />
                    <input
                        value={data.payment_method}
                        onChange={e => setData("payment_method", e.target.value)}
                    />
                </div>

                <button disabled={processing}>Mentés</button>
                <hr style={{ margin: "30px 0" }} />
                <h2>Biometrikus azonosítás</h2><BiometrikusAzon />



        </div>


    );
}