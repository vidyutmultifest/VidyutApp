import React, {useState} from "react";
import '../../styles/dashboard/purchase.sass';
import Modal from "react-modal";
import QRCode from "qrcode.react";
import moment from "moment";
import CartItem from "../purchase/cartItem";

const PurchasedItem = ({ transactionID, orderID, isPaid, products, amount, timestamp, status, issuer }) => {
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
                <div className="purchase-description px-2">{moment(timestamp).fromNow()} | {status} </div>
            </div>
            <Modal
                isOpen={isOpen}
                contentLabel="Transaction Details"
                onRequestClose={() => setOpen(false)}
                className="order-modal"
                overlayClassName="order-modal-overlay"
            >
                <div className="row m-0">
                    <div className="col-md-4 p-4">
                        { !isPaid ? <div className="retry-prompt">Show this QR to retry payment</div> : null }
                        <div className="card-shadow p-4"><QRCode value={transactionID} size={256} style={{ width: '100%', height: '100%' }} /></div>
                    </div>
                    <div className="order-details-section col-md-8 p-4">
                        <h4>Order Summary</h4>
                        <div className="order-meta"><b>Order #:</b> {orderID} | <b>Transaction #:</b> {transactionID} | {moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')}</div>
                        {products.map(p =>
                            <CartItem
                                qty={p.qty}
                                title={p.name}
                                text="No description available"
                                price={`Rs. ${p.price}`}
                            />
                        )}
                    </div>
                </div>
            </Modal>
        </React.Fragment>);
}

export default PurchasedItem;