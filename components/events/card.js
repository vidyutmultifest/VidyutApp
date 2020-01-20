import React from "react";
import classNames from 'classnames';

import '../../styles/events/card.sass';
import PurchasesItems from "../../modules/events/PurchaseItems";
import Image from "../Image";
const shortid = require('shortid');

const EventCard = ({
   name, cover, text, price, detailsURL,
   isNew, isRecommended, alwaysShowCover, isTeamEvent,
   isTotalRate, dept, organizer, products, firstPrize, totalPrize,
   profileData, accreditedBy, registerText, showReason,
   KTUActivityPoints, listOnMobile, accreditorLogo
}) => {

    const renderExtraInfo = (
        <div className="px-2">
            {
                totalPrize ?
                    <div>
                        <div className="value value-num"><span style={{ fontFamily: 'Arial'}}>₹</span>{ totalPrize }</div>
                        <div className="key">Total Cash Prize</div>
                    </div> : firstPrize ?
                    <div>
                        <div className="value value-num"><span style={{ fontFamily: 'Arial'}}>₹</span>{ firstPrize }</div>
                        <div className="key">First Prize</div>
                    </div> : null
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
                        {
                            accreditorLogo ?
                                <div>
                                    <div className="key">Accredited by </div>
                                    <img src={accreditorLogo} style={{ height: '32px', marginTop: '0.25rem' }} alt={`${accreditedBy}`} />
                                </div>
                                :
                                <div>
                                    <div className="key">Accredited by </div>
                                    <div className="value">{ accreditedBy }</div>
                                </div>
                        }
                    </div> : null
            }
        </div>
    );

    const renderListMode = (
        <div className="row m-0">
            <div className="col-5 col-md-12 p-0">
                <a href={detailsURL}>
                    <div
                        className={classNames('event-cover', !alwaysShowCover ? 'd-none d-md-block' : null)}
                        style={{
                            backgroundImage: `url(${cover ? cover : require('../../images/assets/vidyut_placeholder.jpg')})`,
                            backgroundSize: 'cover',
                            height: '100%',
                            minHeight: '60px',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        <div className="event-card-badges">
                            { isNew ? <span className="new-badge">New</span> : null }
                            { isRecommended ? <img style={{ width: '24px' }} src={require('../../images/icons/star.png')} /> : null}
                        </div>
                    </div>
                </a>
            </div>
            <div className="col-7 col-md-12 p-0">
                <div
                     className="event-details"
                     style={{padding: '0.5rem', marginBottom: 0}}
                >
                    { dept ?
                        <div className="d-flex">
                            <div className="dept-name bg-warning p-2 small-text mb-2">{dept}</div>
                        </div> : null
                    }
                    <a href={detailsURL} className="plain-link text-dark">
                        <h4>{name}</h4>
                    </a>
                    { organizer ?  <div className="organizername font-weight-bold"> by {organizer}</div> : null }
                    <p>{text}</p>
                    <div className="text-center event-extra-info">
                    </div>
                </div>
                <div className="row m-0 pl-2 pb-3 event-card-footer">
                    <div className="col-md-5 d-flex align-items-center p-2">
                        <div className="price text-center text-md-left">
                            {
                                price ? parseInt(price) !== 0 ?
                                    <React.Fragment>
                                        <span style={{ fontFamily: 'Arial'}}>₹</span>{price}
                                    </React.Fragment> :
                                    <React.Fragment>Free</React.Fragment>
                                    : null
                            }
                            <div className="price-type">
                                {isTeamEvent ? isTotalRate ? "per team" : "per head" : null }
                            </div>
                        </div>
                        <div className="extra-info-listing">
                            {renderExtraInfo}
                        </div>
                    </div>
                    <div className="col-md-7 p-0">
                        <div className="d-flex align-items-center event-card-buttons">
                            {
                                detailsURL || !profileData ?
                                        <a href={detailsURL} className="btn btn-warning detail-button plain-link">
                                            Know More
                                        </a> : null
                            }
                            { products && profileData ?
                                <PurchasesItems
                                    products={products}
                                    hideReason
                                    profileData={profileData}
                                    buttonClass="register-btn"
                                    customText={
                                        <img
                                            src={require('../../images/icons/cart-icon-green.png')}
                                        />
                                    }
                                /> : <a href="/login" className="register-btn">
                                        <img src={require('../../images/icons/cart-icon-green.png')}/>
                                    </a>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderGridMode = (
        <div>
            <a href={detailsURL}>
                <div className="event-cover">
                    <Image
                        src={cover ? cover : require('../../images/assets/vidyut_placeholder.jpg')}
                        alt={`cover image for ${name} event at Vidyut 2020`}
                    />
                    <div className="event-card-badges">
                        { isNew ? <span className="new-badge">New</span> : null }
                        { isRecommended ? <img style={{ width: '24px' }} src={require('../../images/icons/star.png')} /> : null}
                    </div>
                </div>
            </a>
            <div className="event-details">
                { dept ?
                    <div className="d-flex justify-content-end">
                        <div className="dept-name bg-warning p-2 small-text mb-2">{dept}</div>
                    </div> : null
                }
                <a href={detailsURL} className="plain-link text-dark">
                    <h4>{name}</h4>
                </a>
                { organizer ?  <div className="organizername font-weight-bold"> by {organizer}</div> : null }
                <p>{text}</p>
                <div className="text-center event-extra-info">{renderExtraInfo}</div>
            </div>
            <div className="row m-0 px-1 py-3 event-card-footer-grid">
                <div className="col-md-5 d-flex align-items-center p-2">
                    <div className="price text-center text-md-left">
                        {
                            price ? parseInt(price) !== 0 ?
                                <React.Fragment>
                                    <span style={{ fontFamily: 'Arial'}}>₹</span>{price}
                                </React.Fragment> :
                                <React.Fragment>Free</React.Fragment>
                                : null
                        }
                        <div className="price-type">
                            {isTeamEvent ? isTotalRate ? "per team" : "per head" : null }
                        </div>
                    </div>
                </div>
                <div className="col-md-7 p-0">
                    <div className="d-flex align-items-center event-card-buttons">
                        {
                            detailsURL || !profileData ?
                                <a href={detailsURL} className="btn detail-button plain-link">
                                    Know More
                                </a> : null
                        }
                        { products && profileData ?
                            <PurchasesItems
                                products={products}
                                hideReason
                                profileData={profileData}
                                buttonClass="register-btn"
                                customText={
                                    <img src={require('../../images/icons/cart-icon-green.png')}/>
                                }
                            /> : <a href="/login" className="register-btn">
                                    <img src={require('../../images/icons/cart-icon-green.png')}/>
                                </a>
                        }
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div key={shortid.generate()} className="event-card card-shadow h-100">
            {
                listOnMobile ?
                    <React.Fragment>
                        <div className="d-none d-md-block">
                            {renderGridMode}
                        </div>
                        <div className="d-md-none d-block">
                            {renderListMode}
                        </div>
                    </React.Fragment>
                    : renderGridMode
            }
        </div>
    );
};

export  default EventCard;