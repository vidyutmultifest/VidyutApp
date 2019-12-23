import React from "react";

import '../../styles/events/headerCard.sass';
import PurchasesItems from "../../modules/events/PurchaseItems";
import Cookies from "universal-cookie";
import Link from "next/link";

const cookies = new Cookies();

const EventHeaderCard = ({ name, cover, text, products, registerText, dept }) => {
    const token = cookies.get('token');
    const isLoggedIn = token != null;

    return (<div className="event-header-card card-shadow">
        <div className="p-0 event-cover">
            <img src={cover} className="w-100"/>
        </div>
        <div className="p-4">
            <div className="event-details">
                {
                    dept ?
                        <div className="badge badge-warning px-4 py-2 rounded-0 mb-2">{dept}</div>
                        : null
                }
                <h1>{name}</h1>
                <p>{text}</p>
            </div>
            <div>
                { isLoggedIn ?
                    <PurchasesItems products={products} RegisterText={registerText}/> :
                    <Link href="/login">
                        <button className="btn btn-primary rounded-0 px-4 py-2">Login to {registerText ? registerText : "Register"}</button>
                    </Link>
                }
            </div>
        </div>
    </div>)
};

export  default EventHeaderCard;