import React, {useState} from "react";
import Link from "next/link";
import Modal from "react-modal";

const PurchasesItems = ({ products, RegisterText }) => {

    const [showModal, setModalState] = useState(false);

    return (
        <div id="purchases-card">
            {
                products.length === 1 ? products.map((p) =>
                    <Link href={
                        p.requireRegistration ?
                            `/registrations/register?product=${p.productID}` :
                            `/purchase?product=${p.productID}`
                    }>
                        <button>{RegisterText ? RegisterText : "Register" } Now</button>
                    </Link>
                ) : (
                    <div>
                        <button onClick={() => setModalState(true)}>{RegisterText ? RegisterText : "Register"} Now</button>
                        <Modal
                            isOpen={showModal}
                            contentLabel="Payment at Counter"
                            onRequestClose={() => setModalState(false)}
                            className="purchase-options-modal "
                            overlayClassName="purchase-options-overlay p-2"
                        >
                            <div className="purchase-container p-4">
                                <h3>Select from Choice</h3>
                                {
                                    products.map((p, i) =>
                                        <div key={i} className="p-2">
                                            <Link href={
                                                p.requireRegistration ?
                                                `/registrations/register?product=${p.productID}` :
                                                    `/purchase?product=${p.productID}`
                                            }>
                                                <button className="purchase-option-button card-shadow">
                                                    <h6>{p.name}</h6>
                                                    {
                                                        p.isAmritapurianOnly ?
                                                            <div className="badge badge-warning rounded-0">Exclusive for Amritapurians</div> :
                                                            p.isFacultyOnly ?
                                                                <div className="badge badge-warning rounded-0">Exclusive for Faculty/Industry Personnels</div> :
                                                                p.isSchoolOnly ?
                                                                    <div className="badge badge-warning rounded-0">Exclusive for School Students</div> : null
                                                    }
                                                    <div className="amount">Rs. {p.price}</div>
                                                </button>
                                            </Link>
                                        </div>
                                    )
                                }
                            </div>
                        </Modal>
                    </div>

                )
            }
        </div>
    );
};

export default PurchasesItems;