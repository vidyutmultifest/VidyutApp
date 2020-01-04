import Link from "next/link";
import React from "react";

import '../../styles/events/card.sass';
import PurchasesItems from "../../modules/events/PurchaseItems";

const EventCard = ({ name, cover, text, price, detailsURL, isNew, isRecommended, isTeamEvent, isTotalRate, dept, organizer, products, RegisterText }) => (
            <div className="event-card card-shadow h-100">
                <Link href={detailsURL}>
                    <div className="event-cover d-none d-md-block">
                        <img src={cover ? cover : require('../../images/assets/vidyut_placeholder.jpg')} />
                        <div className="event-card-badges">
                            { isNew ? <span className="new-badge">New</span> : null }
                            { isRecommended ? <span className="recommend-badge">Recommended</span>: null}
                        </div>
                    </div>
                </Link>
                <div className="event-details">
                    { dept ? <div className="d-flex justify-content-end"><div className="dept-name bg-warning p-2 small-text mb-2">{dept}</div></div> : null}
                    <Link href={detailsURL}>
                        <h4>{name}</h4>
                    </Link>
                    { organizer ?  <div className="organizername"> by {organizer}</div> : null }
                    <p>{text}</p>
                    <div className="price text-right mt-4">
                        {
                            parseInt(price) > 0 ?
                            <React.Fragment>
                                ₹ {price}{isTeamEvent ? isTotalRate ? "/team" : "/head" : null }
                            </React.Fragment> : <React.Fragment>Free</React.Fragment>
                        }
                    </div>
                    <div>
                        { products ? <PurchasesItems
                            products={products}
                            hideReason={true}
                            customText={RegisterText ? RegisterText : "Register" }
                        /> : null }
                        <Link href={detailsURL}>
                            <a href={detailsURL} className="plain-link">
                                <button className="btn btn-warning px-4 py-2 m-2">View More</button>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
);

export  default EventCard;