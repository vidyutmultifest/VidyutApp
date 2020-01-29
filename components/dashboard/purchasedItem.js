import React, {useState} from "react";
const shortid = require('shortid');

import '../../styles/dashboard/purchase.sass';
import '../../styles/bootstrap.sass';
import Modal from "react-modal";
import moment from "moment";
import Lottie from "react-lottie";
import dataFetch from "../../utils/dataFetch";
import QRCode from "qrcode.react";

const PurchasedItem = ({ transactionID, orderID, transaction, handleRefresh, products, amount, timestamp, status, issuer }) => {
    const [isOpen, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const renderOnlineTransactionDetails = () => {
        let data;
        try {
           data = JSON.parse(transaction.transactionData);

        } catch (e) {
            data = null
        }
        return (
            <React.Fragment>
                <div><b>Bank Reference No.:</b> {data ? data.bankrefno : "No Response Recieved"}</div>
                <div> <b>Bank Response:</b> {data ? data.statusDesc : "No Response Recieved"}</div>
            </React.Fragment>
        )
    };

    const getStatus = `query getStatus($transactionID: String){
      getOnlinePaymentStatus(transactionID: $transactionID)
      {
        status
        data
      }
    }`;

    const getStatusData = async variables => await dataFetch({ query: getStatus, variables });

    const handleRefetch = () => {
        setLoading(true);
        getStatusData({transactionID}).then((response) => {
            setLoading(false);
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                handleRefresh();
            }
        });
    };

    return (
        <React.Fragment>
            <div onClick={()=> setOpen(true)} className="purchased-item">
                <div className="row m-0">
                    <div className="col-9 px-2">
                        {products.map(p => <h6 key={shortid.generate()}>{p.name}</h6>)}
                    </div>
                    <div className="col px-2">
                        <div className="amount">{amount ? <b>₹{amount}</b> : null }</div>
                    </div>
                </div>
                <div className="purchase-description px-2">{moment(timestamp).fromNow()} | {status} </div>
                <button className="px-2 ml-2 mt-2 py-1 btn small-text btn-primary btn-shadow">View Details</button>
            </div>
            <Modal
                isOpen={isOpen}
                contentLabel="Transaction Details"
                onRequestClose={() => setOpen(false)}
                className="order-modal"
                overlayClassName="order-modal-overlay"
            >
                    <div className="order-details-section p-4">
                        <div className="d-flex align-items-center">
                            <div style={{ maxWidth: 100, marginRight: "0.5rem" }}>
                                {
                                    transaction && transaction.isPaid ?
                                        <Lottie
                                            options={{
                                                loop: true,
                                                autoplay: true,
                                                animationData: require('../../images/animations/check-success'),
                                            }}
                                            height={100}
                                            width={100}
                                        /> : transaction && transaction.isPending ?
                                        <Lottie
                                            options={{
                                                loop: true,
                                                autoplay: true,
                                                animationData: require('../../images/animations/clock-pending'),
                                            }}
                                            height={100}
                                            width={100}
                                        /> : <Lottie
                                            options={{
                                                loop: true,
                                                autoplay: true,
                                                animationData: require('../../images/animations/cross-failed'),
                                            }}
                                            height={100}
                                            width={100}
                                        />
                                }
                            </div>
                            <div>
                                <h4 className="mb-2">Order Summary</h4>
                                <div className="d-flex">
                                    {status}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            {
                                isLoading ?
                                    <Lottie
                                        options={{
                                            loop: true,
                                            autoplay: true,
                                            animationData: require('../../images/animations/material-wave-loading'),
                                        }}
                                        height={64}
                                        width={64}
                                    />
                                    : transaction && transaction.isOnline && !transaction.isProcessed ?
                                    <button
                                        onClick={handleRefetch}
                                        className="btn btn-primary px-2 py-2 rounded-0 font-weight-bold mt-4 d-flex align-items-center"
                                    >
                                        <Lottie
                                            options={{
                                                loop: true,
                                                autoplay: true,
                                                animationData: require('../../images/animations/reload-icon-white'),
                                            }}
                                            height={32}
                                            width={32}
                                        /> <div className="mx-2">
                                        Refetch Status
                                    </div>
                                    </button> : null
                            }
                        </div>
                        {
                            !isLoading ? (
                                <div className="small-text bg-light p-3 my-4" style={{ lineHeight: 1.5 }}>
                                    <div><b>Timestamp:</b>  {moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')}</div>
                                    <div><b>Order #:</b> {orderID}</div>
                                    <div><b>Transaction #:</b> {transaction ? transactionID : 'N/A'}</div>
                                    <div><b>Payment Mode:</b> {transaction ? transaction.isOnline ? 'Online' : 'Offline' : 'N/A'}</div>
                                    { issuer ? (<span>| <b>Payment Handled by </b> { issuer }</span>):
                                        transaction && transaction.isOnline ? renderOnlineTransactionDetails() : null
                                    }
                                </div>
                            ) : null
                        }
                        {
                            transaction && !transaction.isPaid ?
                                <div className="d-flex justify-content-center">
                                    <QRCode value={transaction ? transactionID : null} size={150} />
                                </div> : null
                        }
                        <div>
                            <h5 className="py-3">Order Items</h5>
                            {products.map(p =>
                                <div key={shortid.generate()} className="card-shadow p-4">
                                    <h6>{p.name}</h6>
                                    <span className="small-text">Qty: {p.qty} | Rs.{p.price}</span>
                                </div>
                            )}
                            {
                                transaction ?
                                    <div className="pt-4">
                                        <b>Total:</b> Rs. {transaction.amount}
                                    </div> : null
                            }
                        </div>
                        <div className="py-4 small-text d-flex text-center justify-content-center" style={{ lineHeight: "1.5" }}>
                            <div style={{ maxWidth: "80%" }}>
                                If you have any issue with this order, please feel free to contact us
                                via <a href="mailto:vcare@vidyut.amrita.edu">vcare@vidyut.amrita.edu</a> or
                                through <a href="https://t.me/vcare2020">t.me/vcare2020.</a>
                            </div>
                        </div>
                    </div>
            </Modal>
        </React.Fragment>);
};

export default PurchasedItem;