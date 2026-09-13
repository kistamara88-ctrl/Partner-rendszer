import { Link } from "@inertiajs/react";

export default function UserDetails({ user }) {
    return (
        <div style={{ padding: "20px", maxWidth: "700px" }}>
            <h1>Partner adatai</h1>

            <hr />

            <h2>Partner információk</h2>

            <p><strong>Név:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <hr />

            <h2>Szállítási adatok</h2>

            <p>
                <strong>Irányítószám:</strong>{" "}
                {user.shipping_postal_code || "-"}
            </p>

            <p>
                <strong>Város:</strong>{" "}
                {user.city || "-"}
            </p>

            <p>
                <strong>Cím:</strong>{" "}
                {user.address || "-"}
            </p>

            <p>
                <strong>Szállítási mód:</strong>{" "}
                {user.shipping_method || "-"}
            </p>

            <hr />

            <h2>Fizetési adatok</h2>

            <p>
                <strong>Irányítószám:</strong>{" "}
                {user.billing_postal_code || "-"}
            </p>

            <p>
                <strong>Város:</strong>{" "}
                {user.billing_city || "-"}
            </p>

            <p>
                <strong>Cím:</strong>{" "}
                {user.billing_address || "-"}
            </p>

            <p>
                <strong>Fizetési mód:</strong>{" "}
                {user.payment_method || "-"}
            </p>

            <br />

            <Link href="/admin/users">
                ← Vissza a partnerlistához
            </Link>
        </div>
    );
}