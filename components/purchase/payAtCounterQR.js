import React, {useEffect, useState} from "react";
import QRCode from "qrcode.react";
import dataFetch from "../../utils/dataFetch";
import Link from "next/link";

const PayAtCounterQR = ({ vidyutID, transactionID }) => {

    const [transactionStatus, setTransactionStatus] = useState(false);
    const [processed, setProcessed] = useState(false);
    const [data, setData] = useState();

    const query = `query getTransactionStatus($transactionID: String!){
      getTransactionStatus(transactionID: $transactionID)
      {
        isPaid
        isPending
        isProcessed
        issuer
        {
          firstName
          lastName
          location
          device
        }
        timestamp
      }
    }`;

    const pingTransactionDetails = async variables => await dataFetch({ query, variables });

    useEffect(() => {
        if(!processed)
        {
            const interval = setInterval(() => {
                pingTransactionDetails({ transactionID: transactionID }).then((response) => {
                    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                        setData(response.data.getTransactionStatus);
                            setTransactionStatus(response.data.getTransactionStatus);
                            setProcessed(response.data.getTransactionStatus.isProcessed);
                    }
                })
            }, 5000);
            return () => clearInterval(interval);
        }
    });

    const renderQR = (
        <div>
            <h4>Show at Counter</h4>
            {
                data && data.issuer ?
                    <h6>Your transaction is being now handled by {data.issuer.firstName} {data.issuer.lastName}</h6>
                    : <h6>We are awaiting confirmation for the payment</h6>
            }
            <div>VIDYUT ID: {vidyutID}</div>
            { transactionID ? <QRCode value={transactionID} size={256}/> : null }
            <sub>{transactionID}</sub>
        </div>
    );

    const renderTransactionSuccess = () => (
        <div>
            <h4>Transaction Successful</h4>
            <div>
                <ul>
                    <li><b>Issuer</b>: {data.issuer.firstName} {data.issuer.lastName}</li>
                    <li><b>Timestamp</b>: {data.timestamp}</li>
                    <li><b>Location</b>: {data.issuer.location}</li>
                </ul>
            </div>
            <Link href="/dashboard">
                <button className="btn btn-primary px-4 py-2">Go to Dashboard</button>
            </Link>
        </div>
    );

    const renderTransactionPending = () => (
        <div>
            <h4>Transaction Pending</h4>
            <div>It may take few hours to days for this transaction to be successful. You can see the status in your dashboard</div>
            <div>
                <ul>
                    <li><b>Issuer</b>: {data.issuer.firstName} {data.issuer.lastName}</li>
                    <li><b>Timestamp</b>: {data.timestamp}</li>
                    <li><b>Location</b>: {data.issuer.location}</li>
                </ul>
            </div>
            <Link href="/dashboard">
                <button className="btn btn-primary px-4 py-2">Go to Dashboard</button>
            </Link>
        </div>
    );

    const renderTransactionFailed = () => (
        <div>
            <h4>Transaction Failed</h4>
            <div>You may retry this transaction again showing the below QR</div>
            <div>
                <QRCode value={transactionID} size={256}/>
                <button className="btn btn-primary px-4 py-2 my-2" onClick={() => setProcessed(false)}>Refresh</button>
            </div>
            <Link href="/dashboard">
                <button className="btn btn-primary px-4 py-2">Go to Dashboard</button>
            </Link>
        </div>
    );

    const renderTransaction = () => {
        if(transactionStatus.isPaid)
            return renderTransactionSuccess();
        else if(transactionStatus.isProcessed)
            if(transactionStatus.isPending)
                return  renderTransactionPending();
            else return  renderTransactionFailed();
        return renderQR
    };

    return renderTransaction()
};

export default PayAtCounterQR;