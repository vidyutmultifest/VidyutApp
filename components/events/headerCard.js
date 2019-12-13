import React from "react";

import '../../styles/events/headerCard.sass';
import PurchasesItems from "../../modules/events/PurchaseItems";

const EventHeaderCard = ({ name, cover, text, products }) => (
    <div className="event-header-card card-shadow">
        <div className="p-0 event-cover">
            <img src={cover} />
        </div>
        <div className="row m-0 px-2 py-4">
            <div className="event-details col-md-8 px-4">
                <h1>{name}</h1>
                <p>{text}</p>
            </div>
            <div className="col-md-4 px-2 align-items-center d-flex">
                <PurchasesItems products={products} />
            </div>
        </div>
    </div>
);

export  default EventHeaderCard;