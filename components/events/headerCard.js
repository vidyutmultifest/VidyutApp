import React from "react";

import '../../styles/events/headerCard.sass';
import PurchasesItems from "../../modules/events/PurchaseItems";
import Cookies from "universal-cookie";
import Link from "next/link";

const cookies = new Cookies();

const EventHeaderCard = ({ name, cover, text, products }) => {
    const token = cookies.get('token');
    const isLoggedIn = token != null;

    return (<div className="event-header-card card-shadow">
        <div className="p-0 event-cover">
            <img src={cover} className="w-100"/>
        </div>
        <div className="row m-0 px-2 py-4">
            <div className="event-details col-md-8 px-4">
                <h1>{name}</h1>
                <p>{text}</p>
            </div>
            <div className="col-md-4 px-2 align-items-center d-flex">
                { isLoggedIn ?
                    <PurchasesItems products={products}/> :
                    <Link href="/login">
                        <button className="btn btn-primary rounded-0 px-4 py-2">Login to Register</button>
                    </Link>
                }
            </div>
        </div>
    </div>)
};

export  default EventHeaderCard;