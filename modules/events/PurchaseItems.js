import React, {useEffect, useState} from "react";
import Link from "next/link";
import Modal from "react-modal";
import dataFetch from "../../utils/dataFetch";
const shortid = require('shortid');
import classNames from 'classnames';

const PurchasesItems = ({ products, RegisterText, hideReason, customText, profileData, buttonStyle, buttonClass }) => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);

    const [showModal, setModalState] = useState(false);

    const query = `{
      myProfile
      {
        isAmritian
        isAmritapurian
        isFaculty
        isSchoolStudent
        hasEventsRegistered
      }
    }`;

    const getProfile = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried && !profileData)
        {
            getProfile().then(  response => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.myProfile);
                    setLoaded(true);
                }
            })
        } else if(profileData) {
            setData(profileData);
            setQueried(true);
            setLoaded(true);
        }
    });

    const optionButton = (p, disabled) => (
        <button className="purchase-option-button card-shadow" disabled={disabled}>
            <h6>{p.name}</h6>
            {
                p.isOutsideOnly && data.isAmritapurian ?
                    <div className="badge badge-danger rounded-0">Not Available for Amritapurians</div>
                : p.isAmritapurianOnly && !data.isAmritapurian ?
                    <div className="badge badge-danger rounded-0">Only Available for Amritapurians</div>
                : !p.isAvailable ?
                    <div className="badge badge-danger rounded-0">Unavailable right now</div>
                : p.isAmritapurianOnly ?
                    <div className="badge badge-warning rounded-0">Exclusive for Amritapurians</div> :
                    p.isFacultyOnly ?
                        <div className="badge badge-warning rounded-0">Exclusive for Faculty/Industry Personnels</div> :
                        p.isSchoolOnly ?
                            <div className="badge badge-warning rounded-0">Exclusive for School Students</div> : null
            }
            { !disabled ? <div className="amount">Rs. {
                p.isGSTAccounted ?
                    Math.ceil(parseFloat(p.price) * 1.18) :
                    parseInt(p.price)
            }
            <div className="small-text">
                { p.isGSTAccounted ? 'Inclusive of GST' : '+ GST' }
            </div>
            </div> : null }
        </button>
    );

    const getOptions = (products) => {
       return products.filter( p => {
           if(p.isAvailable &&
               (!p.requireEventRegistration||data.isAmritapurian||data.hasEventsRegistered) &&
               (!p.isAmritapurianOnly||data.isAmritapurian) &&
               (!p.isOutsideOnly||!data.isAmritapurian) &&
               (!p.isFacultyOnly||data.isFaculty) &&
               (!p.isSchoolOnly||data.isSchoolStudent))
               return p
       })
    };

    const showReason = (products) => {
        let available = false;
        let requiresRegistration = false;
        let facultyOnly = false;
        let studentOnly = false;
        let outsiderOnly = false;
        let insiderOnly = false;
        products.map( p => {
           if(p.isAvailable)
           {
               available = true;
               if(p.isOutsideOnly&&data.isAmritapurian)
                   outsiderOnly = true;
               if(p.isAmritapurianOnly&&!data.isAmritapurian)
                   insiderOnly = true;
               if(p.requireEventRegistration&&!data.hasEventsRegistered)
                   requiresRegistration = true;
               if(p.isFacultyOnly&&!data.isFaculty)
                   facultyOnly = true;
               if(p.isSchoolOnly&&!data.isSchoolStudent)
                   studentOnly = true;
           }
        });
        if(!available)
            return <b>Not Available Right Now</b>;
        else {
            let text = '<div>To register for this event, you need to satisfy <b>any/some/all</b> of the following requirements  -';
           if(!data.isFaculty&&facultyOnly)
               text +=  '<li>Be a Faculty/Professional (<a href="/profile/edit-profile">Edit Profile</a> to change account type)</li>';
           if(!data.isSchoolStudent&&studentOnly)
               text += '<li>Be a School Student (<a href="/profile/edit-profile">Edit profile</a> to change account type)</li>';
           if(!data.hasEventsRegistered&&requiresRegistration)
               text += '<li>Register for another technical event already such as a <a href="/competitions">competition</a>/<a href="/workshops">workshop</a></li>';
           if(data.isAmritapurian&&outsiderOnly)
               text += '<li>Be an outsider, i.e. Non-Amritapurian</li>';
           if(!data.isAmritapurian&&insiderOnly)
               text += '<li>Be an Amritapurian [in case of Amritapurian Pass]</li>';
           text += '</div>';
           return <div className="alert-warning p-4" dangerouslySetInnerHTML={{ __html: text }} />
        }
    };

    return (
        <div className="d-inline">
        {
            isLoaded ?
                getOptions(products).length === 1 ? getOptions(products).map((p) =>
                    <Link href={
                        p.requireRegistration ?
                            `/registrations/register?product=${p.productID}` :
                            `/purchase?product=${p.productID}`
                    }
                          key={shortid.generate()}
                    >
                        <a
                            href={
                            p.requireRegistration ?
                                `/registrations/register?product=${p.productID}` :
                                `/purchase?product=${p.productID}`}
                            className="plain-link"
                        >
                            <button
                                style={buttonStyle}
                                className={classNames(`btn btn-primary px-4 py-2 m-2 rounded-0`, buttonClass)}
                            >
                            {
                                customText ? customText :
                                    RegisterText ? `${RegisterText} Now` : "Register Now"
                            }
                            </button>
                        </a>
                    </Link>
                ) : getOptions(products).length > 0 ?
                (
                    <React.Fragment>
                        <button
                            style={buttonStyle}
                            className={classNames(`btn btn-primary px-4 py-2 m-2 rounded-0`, buttonClass)}
                            onClick={() => setModalState(true)}
                        >
                            {
                                customText ? customText :
                                    RegisterText ? `${RegisterText} Now` : "Register Now"
                            }
                        </button>
                        <Modal
                            isOpen={showModal}
                            contentLabel="Registration Option Menu"
                            onRequestClose={() => setModalState(false)}
                            className="purchase-options-modal p-2"
                            overlayClassName="purchase-options-overlay p-2"
                        >
                            <h3 className="pb-2 pt-4 text-center">Select from Choices</h3>
                            <div className="purchase-container px-4 py-2">
                                <div className="row m-0">
                                {
                                    getOptions(products).map( (p,i) => (
                                        <div key={i} className="col-md-6 p-2">
                                            <Link href={
                                                p.requireRegistration ?
                                                    `/registrations/register?product=${p.productID}` :
                                                    `/purchase?product=${p.productID}`
                                            }>
                                                {optionButton(p)}
                                            </Link>
                                        </div>
                                    ))
                                }
                                </div>
                            </div>
                        </Modal>
                    </React.Fragment>
                ) : hideReason ? null : showReason(products)
            : <h6>Loading</h6>
        }
        </div>
    );
};

export default PurchasesItems;