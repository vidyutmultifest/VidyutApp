import Link from "next/link";
import React from "react";

import '../../styles/events/card.sass';

const EventCard = ({ name, cover, text, price, detailsURL, isNew, isRecommended, isTeamEvent, isTotalRate, dept, organizer }) => (
        <Link href={detailsURL}>
            <div className="event-card card-shadow h-100">
                <div className="event-cover">
                   <img src={cover ? cover : require('../../images/assets/landing_headers/before.jpg')} />
                    <div className="event-card-badges">
                        { isNew ? <span className="new-badge">New</span> : null }
                        { isRecommended ? <span className="recommend-badge">Recommended</span>: null}
                    </div>
                </div>
                <div className="event-details">
                    { dept ? <span className="dept-name bg-warning px-4 py-2 mb-2">{dept}</span> : null}
                    <h4>{name}</h4>
                    { organizer ?  <div className="organizername"> by {organizer}</div> : null }
                    <div className="price">₹ {price}{isTeamEvent ? isTotalRate ? "/team" : "/head" : null }</div>
                    <p>{text}</p>
                </div>
            </div>
        </Link>
);

export  default EventCard;