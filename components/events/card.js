import Link from "next/link";
import React from "react";

import '../../styles/events/card.sass';

const EventCard = ({ name, cover, text, price, detailsURL, registerURL, isNew, isRecommended, registerText }) => (
        <div className="event-card card-shadow">
            <div className="event-cover">
                <Link href={detailsURL}><img src={cover ? cover : require('../../images/assets/landing_headers/before.jpg')} /></Link>
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
            <div className="d-flex px-2 pb-2 align-items-center">
                {
                    detailsURL ? <Link href={detailsURL}><a><button className="btn btn-primary details-btn">View Details</button></a></Link> : null
                }
                <Link href={registerURL}><a><button className="btn btn-primary register-btn">{registerText}</button></a></Link>
            </div>
        </div>
);

export  default EventCard;