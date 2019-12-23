import React, {useEffect, useState} from "react";
import Link from "next/link";
import Modal from "react-modal";
import dataFetch from "../../utils/dataFetch";

const PurchasesItems = ({ products, RegisterText }) => {
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
      }
    }`;

    const getProfile = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried)
        {
            getProfile().then(  response => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.myProfile);
                    setLoaded(true);
                }
            })
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
            { !disabled ? <div className="amount">Rs. {p.price}</div> : null }
        </button>
    );

    return (
        <div id="purchases-card">
            {
                isLoaded ?
                    products.length === 1 ? products.map((p) =>
                        <Link href={
                            p.requireRegistration ?
                                `/registrations/register?product=${p.productID}` :
                                `/purchase?product=${p.productID}`
                        }>
                            <button>{RegisterText ? RegisterText : "Register"} Now</button>
                        </Link>
                    ) : (
                        <div>
                            <button onClick={() => setModalState(true)}>{RegisterText ? RegisterText : "Register"} Now
                            </button>
                            <Modal
                                isOpen={showModal}
                                contentLabel="Payment at Counter"
                                onRequestClose={() => setModalState(false)}
                                className="purchase-options-modal "
                                overlayClassName="purchase-options-overlay p-2"
                            >
                                <h3 className="pb-2 pt-4 text-center">Select from Choices</h3>
                                <div className="purchase-container px-4 py-2">
                                    {
                                        products.map((p, i) => p.isAvailable &&
                                                (!p.isAmritapurianOnly||data.isAmritapurian) &&
                                                (!p.isOutsideOnly||!data.isAmritapurian) &&
                                                (!p.isFacultyOnly||data.isFaculty) &&
                                                (!p.isSchoolOnly||data.isSchoolStudent) ?
                                                    <div key={i} className="p-2">
                                                    <Link href={
                                                        p.requireRegistration ?
                                                            `/registrations/register?product=${p.productID}` :
                                                            `/purchase?product=${p.productID}`
                                                    }>
                                                        {optionButton(p)}
                                                    </Link></div> : null
                                        )
                                    }
                                </div>
                            </Modal>
                        </div>
                    ) : <h6>Loading</h6>
            }
        </div>
    );
};

export default PurchasesItems;