import Link from "next/link";
import React from "react";

import '../../styles/events/card.sass';

const EventCard = ({ name, cover, text, price, detailsURL, isNew, isRecommended }) => (
        <Link href={detailsURL}>
            <div className="event-card card-shadow">
                <div className="event-cover">
                   <img src={cover ? cover : require('../../images/assets/landing_headers/before.jpg')} />
                    <div className="event-card-badges">
                        { isNew ? <span className="new-badge">New</span> : null }
                        { isRecommended ? <span className="recommend-badge">Recommended</span>: null}
                    </div>
                </div>
                <div className="event-details">
                    <Link href={detailsURL}><h4>{name}</h4></Link>
                    <div className="price">₹{price}</div>
                    <p>{text}</p>
                </div>
            </div>
        </Link>
);

export  default EventCard;