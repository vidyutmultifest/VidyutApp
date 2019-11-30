import React, {useEffect, useState} from "react";
import QRCode from "qrcode.react";
import dataFetch from "../../utils/dataFetch";
import Link from "next/link";

const PayAtCounterQR = ({ vidyutID, transactionID }) => {

    const [isSuccessful, setSuccessful] = useState(false);
    const [data, setData] = useState();

    const query = `query getTransactionStatus($transactionID: String!){
      getTransactionStatus(transactionID: $transactionID)
      {
        status
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
        if(!isSuccessful)
        {
            const interval = setInterval(() => {
                pingTransactionDetails({ transactionID: transactionID }).then((response) => {
                    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                        setData(response.data.getTransactionStatus);
                        if(response.data.getTransactionStatus.status)
                            setSuccessful(true);
                    }
                })
            }, 5000);
            return () => clearInterval(interval);
        }
    });

    return !isSuccessful ? (
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
    ) : (
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
    )
};

export default PayAtCounterQR;