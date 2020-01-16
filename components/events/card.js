import Link from "next/link";
import React from "react";
import classNames from 'classnames';

import '../../styles/events/card.sass';
import PurchasesItems from "../../modules/events/PurchaseItems";
import Image from "../Image";
const shortid = require('shortid');

const EventCard = ({
                       name, cover, text, price, detailsURL,
                       isNew, isRecommended, alwaysShowCover, isTeamEvent,
                       isTotalRate, dept, organizer, products, firstPrize,
                       profileData, accreditedBy, registerText, showReason,
                       KTUActivityPoints
            }) => (
            <div key={shortid.generate()} className="event-card position-relative card-shadow h-100">
                <Link href={detailsURL}>
                    <div className={classNames('event-cover', !alwaysShowCover ? 'd-none d-md-block' : null)}>
                        <Image
                            src={cover ? cover : require('../../images/assets/vidyut_placeholder.jpg')}
                            alt={`cover image for ${name} event at Vidyut 2020`}
                        />
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
                    { organizer ?  <div className="organizername font-weight-bold"> by {organizer}</div> : null }
                    <p>{text}</p>
                </div>
                <div className="text-center" style={{ marginBottom: '18vh'}}>
                    <div className="px-2">
                        {
                            firstPrize ?
                                <div>
                                    <div>First Prize:</div>
                                    <div style={{ fontSize: 'calc(1rem + 0.2vw)', fontWeight: '900' }}>₹{ firstPrize }</div>
                                </div>
                                : null
                        }
                        {
                            KTUActivityPoints ?
                                <div>
                                    <div>
                                        <img src={require('../../images/icons/coins.png')} style={{ width: '45px', paddingRight: '0.5rem' }} />
                                        <b>{KTUActivityPoints}</b> KTU Activity Points
                                    </div>
                                </div> : null
                        }
                        {
                            accreditedBy ?
                                <div>
                                    <div>Accredited by </div>
                                    <div style={{ fontSize: 'calc(1rem + 0.2vw)', fontWeight: '900' }}>{ accreditedBy }</div>
                                </div>
                                : null
                        }
                    </div>
                </div>
                <div style={{ position: 'absolute', bottom: 0, width: '100%', textAlign: 'center', paddingBottom: '1rem' }}>
                        { products && profileData ?
                            <PurchasesItems
                                products={products}
                                hideReason
                                profileData={profileData}
                                buttonStyle={{ backgroundColor: 'blue', color: 'white', margin: '1rem!important'}}
                                customText={
                                    <div>
                                        <img src={require('../../images/icons/cart-icon.png')} style={{ width: '22px', marginRight: '5px', filter: 'invert(1)' }} />
                                        <span>
                                            {
                                                price ? parseInt(price) !== 0 ?
                                                    <React.Fragment>
                                                        ₹{price}
                                                    </React.Fragment> :
                                                    <React.Fragment>Free</React.Fragment>
                                                    : registerText
                                            }
                                                    {isTeamEvent ? isTotalRate ? "/team" : "/head" : null }
                                        </span>
                                    </div>
                                }
                            /> : <Link href="/dashboard">
                                <a href="/dashboard">
                                    <div className="btn btn-primary btn-shadow px-4 py-2 m-2 rounded-0">
                                        <img src={require('../../images/icons/cart-icon.png')} style={{ width: '22px', marginRight: '5px', filter: 'invert(1)' }} />
                                        <span>
                                            {
                                                price ? parseInt(price) !== 0 ?
                                                    <React.Fragment>
                                                        ₹{price}
                                                    </React.Fragment> :
                                                    <React.Fragment>Free</React.Fragment>
                                                    : registerText
                                            }
                                            {isTeamEvent ? isTotalRate ? "/team" : "/head" : null }
                                        </span>
                                    </div>
                                </a>
                            </Link>
                        }
                    {
                        detailsURL || !profileData ?
                            <Link href={detailsURL}>
                                <a href={detailsURL} className="plain-link">
                                    <button className="btn btn-warning px-4 m-1 py-2">Know More</button>
                                </a>
                            </Link> : null
                    }
                    </div>
                </div>
);

export  default EventCard;