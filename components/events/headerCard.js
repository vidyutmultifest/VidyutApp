import React from "react";

import '../../styles/events/headerCard.sass';

const EventHeaderCard = ({ name, cover, text }) => (
    <div className="event-header-card card-shadow">
        <div className="p-0 event-cover">
            <img src={cover} />
        </div>
        <div className="event-details col-md-4">
            <h1>{name}</h1>
            <p>{text}</p>
        </div>
    </div>
);

export  default EventHeaderCard;