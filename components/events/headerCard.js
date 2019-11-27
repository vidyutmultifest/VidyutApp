import React from "react";

import '../../styles/events/headerCard.sass';

const EventHeaderCard = ({ name, cover, text }) => (
    <div className="event-header-card card-shadow">
        <div className="row m-0">
            <div className="col-md-8 p-0 event-cover" style={{ backgroundImage: `url(${cover})`}}>
                <img src={cover} className="d-md-none d-block" />
            </div>
            <div className="event-details col-md-4">
                <h1>{name}</h1>
                <p>{text}</p>
            </div>
        </div>
    </div>
);

export  default EventHeaderCard;