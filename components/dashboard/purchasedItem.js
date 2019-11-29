import React, {useState} from "react";
import '../../styles/dashboard/purchase.sass';
import Modal from "react-modal";
import QRCode from "qrcode.react";

const PurchasedItem = ({ orderID, products, amount, timestamp, isSuccessful }) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <React.Fragment>
            <div onClick={()=> setOpen(true)} className="purchased-item">
                <div className="row m-0">
                    <div className="col-9 px-2">
                        {products.map(p => <h6>{p.name}</h6>)}
                    </div>
                    <div className="col px-2">
                        <div className="amount">₹{amount}</div>
                    </div>
                </div>
                <div className="purchase-description px-2">{timestamp.toString()} | {
                    isSuccessful ?
                        <div className="badge badge-success">Payment Successful</div>
                        : <div className="badge badge-danger">Payment Failed</div>
                } </div>
            </div>
            <Modal
                isOpen={isOpen}
                contentLabel="Transaction Details"
                onRequestClose={() => setOpen(false)}
                className="order-modal"
                overlayClassName="order-modal-overlay"
            >
                <div className="row m-0">
                    <div className="col-4">
                        <QRCode value={orderID} size={128} />
                    </div>
                    <div className="col-md-8">
                        <h4>Order Details</h4>
                        <ul>
                            {products.map(p =>
                                <li>{p.name}</li>
                            )}
                        </ul>
                    </div>
                </div>
            </Modal>
        </React.Fragment>);
}

export default PurchasedItem;