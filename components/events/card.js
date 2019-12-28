import Link from "next/link";
import React from "react";

import '../../styles/events/card.sass';

const EventCard = ({ name, cover, text, price, detailsURL, isNew, isRecommended, isTeamEvent, isTotalRate, dept, organizer }) => (
        <Link href={detailsURL}>
            <div className="event-card card-shadow h-100">
                <div className="event-cover d-none d-md-block">
                    <img src={cover ? cover : require('../../images/assets/landing_headers/before.jpg')} />
                    <div className="event-card-badges">
                        { isNew ? <span className="new-badge">New</span> : null }
                        { isRecommended ? <span className="recommend-badge">Recommended</span>: null}
                    </div>
                </div>
                <div className="event-details">
                    { dept ? <div className="d-flex justify-content-end"><div className="dept-name bg-warning p-2 small-text mb-2">{dept}</div></div> : null}
                    <h4>{name}</h4>
                    { organizer ?  <div className="organizername"> by {organizer}</div> : null }
                    <p>{text}</p>
                    <div className="price text-right mt-4">₹ {price}{isTeamEvent ? isTotalRate ? "/team" : "/head" : null }</div>
                </div>
            </div>
        </Link>
);

export  default EventCard;