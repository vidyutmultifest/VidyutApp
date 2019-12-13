import React, {useState} from "react";
import Link from "next/link";

const PurchasesItems = ({ products }) => {

    const [showModel, setModalState] = useState(false);

    return (
        <div id="purchases-card">
            {
                products.length === 1 ? products.map((p) =>
                    <Link href={`/registrations/register?product=${p.productID}`}>
                        <button>Register Now</button>
                    </Link>
                ) : (
                    <button onClick={() => setModalState(true)}>Register Now</button>
                )
            }
        </div>
    );
};

export default PurchasesItems;