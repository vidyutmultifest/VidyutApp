import React from "react";
import Link from "next/link";

const PurchasesItems = ({ products }) => {

    return (
        <div id="prizes-card" className="card-shadow p-4 my-4">
            <h4>Register</h4>
            {
                products.map((p) =>
                    <Link href={`/registrations/register?product=${p.productID}`}>
                        <button className="btn btn-primary">Register Now</button>
                    </Link>
                )
            }
        </div>
    );
};

export default PurchasesItems;