import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import dynamic from "next/dynamic";

import { osName, mobileVendor, mobileModel, browserName } from 'react-device-detect';
import { geolocated } from "react-geolocated";

import NoSSR from "../../components/noSSR";
import TitleBar from "../../components/titleBar";
import Base from "../../components/base";
import dataFetch from "../../utils/dataFetch";
import DashboardFooter from "../../modules/dashboard/footer";

import "../../styles/restricted/acceptPayment.sass"
import CartItem from "../../components/purchase/cartItem";
import AdminRequired from "../../components/adminRequired";

const AcceptPayment = (props) => {

    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState();
    const [isPaid, setPaid] = useState(false);
    const [transactionStatus, setTransactionStatus] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(false);
    const [transactionID, setTransaction] = useState();
    const [qrScanned, setQrScanned] = useState(false);
    const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false});

    const collectTransactionMutation = `mutation collectPayment($status: String!, $transactionID: String!, $deviceDetails: String!, $location: String!)
    {
      collectPayment(status: $status, transactionID: $transactionID, deviceDetails: $deviceDetails, location: $location)
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
        isPaid
        issuer
        {
           firstName
           lastName
        }
        products
        {
          name
          price
          qty
        }
        user
        {
          firstName
          lastName
          vidyutID
          photo
        }
      }
    }`;

    const getTransactionDetails = async variables => await dataFetch({ query: getTransactionQuery, variables });
    const collectTransactionPayment = async variables => await dataFetch({ query: collectTransactionMutation, variables });


    useEffect(() => {
        if(typeof window != "undefined") { setLoaded(true); }
    });

    const searchTransaction = (transactionID) => {
        getTransactionDetails({ transactionID: transactionID }).then((response) =>{
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                setData(response.data.getTransactionDetail);
                setLoaded(true);
            }
        });
    };

    const confirmPayment = (transactionID, status) => {
        collectTransactionPayment({
            status: status,
            transactionID: transactionID,
            location: `${props.coords.latitude}, ${props.coords.longitude}`,
            deviceDetails: `${browserName}, ${osName}, ${mobileVendor}, ${mobileModel}`
        }).then((response) =>{
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                setPaymentStatus(response.data.collectPayment.status);
                setTransactionStatus(status);
                setPaid(true);
            }
        });
    };

    const handleScan = data => {
        if(data!=null)
        {
            setTransaction(data);
            setQrScanned(true);
            searchTransaction(data);
        }
    };

    const renderTransactionDetails = () => (
        <div id="accept-payment-confirmation">
            {
                !data.isPaid ? (
                    <div>
                        <div className="p-4">
                            <h1 className="mb-0">Collect ₹{data.amount} from {data.user.firstName}</h1>
                        </div>
                        <div className="payment-confirmation-list">
                            <h4>Purchase Summary</h4>
                            {
                                data.products ? data.products.map(p => (
                                    <CartItem
                                        qty={p.qty}
                                        title={p.name}
                                        text="No description available"
                                        price={`Rs. ${p.price}`}
                                    />
                                )) : null
                            }
                        </div>
                        <div className="accept-payment-actions p-4">
                            <button
                                className="btn btn-success py-2 m-2 px-4"
                                onClick={() => confirmPayment(transactionID, "paid")}
                            >
                                Confirm Payment
                            </button>
                            <button
                                className="btn btn-success py-2 m-2 px-4"
                                onClick={() => confirmPayment(transactionID, "pending")}
                            >
                                Pending Payment
                            </button>
                            <button
                                className="btn btn-danger py-2 m-2 px-4"
                                onClick={() => {
                                    confirmPayment(transactionID, "reject");
                                    setQrScanned(false);
                                    setTransactionStatus(false);
                                    setLoaded(false);
                                }}
                            >
                                Rescan QR
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="p-4">
                            <h1 className="mb-0">Transaction already successful.</h1>
                            <ul>
                                <li><b>Collected by:</b> {data.issuer.firstName} {data.issuer.lastName}</li>
                                <li><b>Timestamp:</b> {data.timestamp}</li>
                            </ul>
                            <button
                                className="btn btn-danger py-2 m-2 px-4"
                                onClick={() => {
                                    setQrScanned(false);
                                    setLoaded(false);
                                }}
                            >
                                Rescan QR
                            </button>
                        </div>
                    </div>
                )
            }

        </div>
    );

    const renderPaymentStatusConfirmation = () => (
        <div className="container p-4">
            <div className="card-shadow p-2">
                {
                    paymentStatus ? (
                        <div>
                            {
                                transactionStatus ?
                                    transactionStatus === "paid" ?
                                        <React.Fragment>
                                            <h1>Transaction Successful</h1>
                                            <p>It has been recorded that you have collected ₹{data.amount} from {data.user.firstName} {data.user.lastName}</p>
                                            <ul>
                                                <li><b>Transaction ID:</b> {transactionID}</li>
                                            </ul>
                                        </React.Fragment> :
                                    transactionStatus === "reject" ?
                                        <React.Fragment>
                                            <h1>Transaction Rejected</h1>
                                            <ul>
                                                <li><b>Transaction ID:</b> {transactionID}</li>
                                            </ul>
                                        </React.Fragment> :
                                        <React.Fragment>
                                            <h1>Transaction Pending</h1>
                                            <p>The collection of payment of ₹{data.amount} from {data.user.firstName} {data.user.lastName} has been recorded as pending.</p>
                                            <ul>
                                                <li><b>Transaction ID:</b> {transactionID}</li>
                                            </ul>
                                        </React.Fragment> : null
                            }

                        </div>
                    ) : <h1>Transaction Failed Unexpectedly</h1>
                }
                <button
                    className="btn btn-primary py-2 m-2 px-4"
                    onClick={() => {
                        setQrScanned(false);
                        setLoaded(false);
                        setPaid(false);
                    }}
                >
                    Rescan QR
                </button>
            </div>
        </div>
    );

    return <Base loginRequired>
        <Head>
            <title>Accept Payment | Admin | Vidyut 2020</title>
        </Head>
        <TitleBar/>
        <AdminRequired>
        {
            !props.isGeolocationAvailable ? (
                <div>Your browser does not support Geolocation</div>
            ) : !props.isGeolocationEnabled ? (
                <div>Geolocation is not enabled</div>
            ) : isPaid ? renderPaymentStatusConfirmation() : qrScanned ? (
                <div className="container p-4">
                    <div id="accept-payment-card" className="card-shadow">
                        {isLoaded && data ? renderTransactionDetails() : null}
                    </div>
                </div>
            ) : (
                <div className="container p-4 justify-content-center d-flex">
                    <div style={{ width: "600px" }}>
                        <div className="qr-scanner card-shadow">
                            <NoSSR>
                                <QrReader
                                    delay={300}
                                    onScan={handleScan}
                                    onError={(e) => console.log(e)}
                                    facingMode="environment"
                                    style={{width: '100%'}}
                                />
                            </NoSSR>
                        </div>
                    </div>
                </div>
            )
        }
        </AdminRequired>
        <DashboardFooter/>
    </Base>
};

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(AcceptPayment);