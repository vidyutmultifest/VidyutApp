import React, {useEffect, useState} from 'react'

import NoSSR from "../../components/noSSR";
import TitleBar from "../../components/titleBar";
import Base from "../../components/base";
import dynamic from "next/dynamic";
import dataFetch from "../../utils/dataFetch";
import QRCode from "qrcode.react";

const AcceptPayment = () => {

    const [isLoaded, setLoaded] = useState(false);
    const [isQueried, setQueried] = useState(false);
    const [data, setData] = useState();
    const [transactionID, setTransaction] = useState();
    const [qrScanned, setQrScanned] = useState(false);
    const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false});

    const collectTransactionMutation = `mutation collectPayment($transactionID: String!)
    {
      collectPayment(transactionID: $transactionID)
      {
        status
      }
    }`;

    const getTransactionQuery = `query getTransaction($transactionID: String!)
    {
      getTransactionDetail(transactionID: $transactionID)
      {
        timestamp
        amount
        isSuccessful
      }
    }`;

    const getTransactionDetails = async variables => await dataFetch({ query: getTransactionQuery, variables });


    useEffect(() => {
        if(typeof window != "undefined") { setLoaded(true); }
    });

    const searchTransaction = (transactionID) => {
        getTransactionDetails({ transactionID: transactionID }).then((response) =>{
            setQueried(true);
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                setData(response.data.getTransactionDetail);
                setLoaded(true);
            }
        });
    };

    const handleScan = data => {
        if(data!=null)
        {
            if(data!==transactionID)
            {
                setTransaction(data);
                setQrScanned(true);
                searchTransaction(data);
            }
        }
    };

    const renderTransactionDetails = () => (
        <div>
            <h1>Transaction Details</h1>
            {
                !data.isSuccessful ? (
                    <h4>Amount: Rs. {data.amount}</h4>
                ) : null
            }
            <div className="btn btn-primary">Accept Payment</div>
        </div>
    );

    return <Base loginRequired>
        <TitleBar/>
        <div className="container p-2">
            <div className="card-shadow">
                <div className="row m-0">
                    <div className="col-md-6">
                        {
                            qrScanned ?
                                <QRCode value={transactionID} size={256} style={{ width: "100%", height: 'auto' }}/>
                            : <NoSSR>
                                    <QrReader
                                        delay={300}
                                        onScan={handleScan}
                                        onError={(e) => console.log(e)}
                                        facingMode="environment"
                                        style={{ width: '100%' }}
                                    />
                                </NoSSR>
                        }
                    </div>
                    <div className="col-md-6">
                        { setLoaded && data ? renderTransactionDetails() : null }
                    </div>
                </div>
            </div>
        </div>
    </Base>
};

export default AcceptPayment;