import React, {useEffect, useState} from "react";
import Head from "next/head";

import Lottie from "react-lottie";
import Cookies from "universal-cookie";

import Base from "../../components/base";
import TitleBar from "../../components/titleBar";
import dataFetch from "../../utils/dataFetch";

import StatusContainer from "../../components/StatusContainer";
import Link from "next/link";

const cookies = new Cookies();

const AuthorizePage = ({ req }) => {

    console.log(req);

    const [isQueried, setQueried] = useState(false);
    const [isResponseLoaded, setResponseLoaded] = useState(false);
    const [transData, setTransData] = useState(false);

    const transactionID = cookies.get('transactionID');

    const getStatus = `query getStatus($transactionID: String){
      getOnlinePaymentStatus(transactionID: $transactionID)
      {
        status
        data
      }
    }`;

    const getStatusData = async variables => await dataFetch({ query: getStatus, variables });

    useEffect(() => {
        if (!isQueried) {
            const transactionID = cookies.get('transactionID');
            getStatusData({transactionID}).then((response) => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setTransData(response.data.getOnlinePaymentStatus);
                    setResponseLoaded(true);
                }
            });
        }
    });

    const ACRDCredit = (
        <div className="text-center mt-4">
            <div className="font-weight-bold mb-4">Payment Partner</div>
            <img src={require('../../images/logos/acrd-logo.jpg')} style={{ width: "250px"}} />
        </div>
    );

    const renderTransactionStatus = ({ data: msg, status}) => {
        let failed = false;
        if(!status){
            failed = true;
            console.log(status);
        }
        let transactionDetails;
        if(msg !== "FAILED") {
            transactionDetails = JSON.parse(JSON.parse(msg));
        } else {
            failed = true;
        }
        return !failed && transactionDetails.status === "SUCCESS" ?
            <div>
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: require('../../images/animations/payment-success'),
                    }}
                    height={400}
                    width={400}
                />
                <h1>Payment Successful</h1>
                <p>{transactionDetails.statusDesc}</p>
                <div>

                </div>
                <div className="alert alert-success text-left">
                    <div><b>Transaction ID</b>: {transactionDetails.transactionId}</div>
                    <div><b>Amount</b>: {transactionDetails.amount} {transactionDetails.currency}</div>
                    <div><b>Bank Reference Number</b>:{ transactionDetails.bankrefno}</div>
                </div>
                <div className="my-4">
                    <Link href="/dashboard">
                        <button className="btn btn-primary px-4 py-2 rounded-0">Go to Dashboard</button>
                    </Link>
                </div>
                {ACRDCredit}
            </div> : <div>
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: require('../../images/animations/payment-failed'),
                    }}
                    height={300}
                    width={300}
                />
                <h1>Payment Failed/Pending</h1>
                <p>{transactionDetails.statusDesc}</p>
                <div className="alert alert-warning text-left">
                    <div><b>Message</b>: {transactionDetails.statusDesc}</div>
                    <div><b>Transaction ID</b>: {transactionDetails.transactionId}</div>
                    <div><b>Amount</b>: {transactionDetails.amount} {transactionDetails.currency.toUpperCase()}</div>
                    <div><b>Bank Reference Number</b>:{transactionDetails.bankrefno}</div>
                </div>
                <div className="my-4">
                    <Link href="/dashboard">
                        <button className="btn btn-primary px-4 py-2 rounded-0">Go to Dashboard</button>
                    </Link>
                </div>
                {ACRDCredit}
            </div>
    };

    const renderFetchingTrans = () => {
        return (
            <div style={{ maxWidth: '720px' }}>
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: require('../../images/animations/search'),
                    }}
                    height={300}
                    width={300}
                />
                <h1>Fetching Transaction Details</h1>
                <p className="small-text">
                    We are awaiting the response from ACRD payment gateway for getting status of your transaction <b>{transactionID}</b>.
                    It might take upto few minutes for them to confirm your payment, and <b>you can check back later in
                    your dashboard to review the status of your payment.</b>
                </p>
                <div className="my-4">
                    <Link href="/dashboard">
                        <button className="btn btn-primary px-4 py-2 rounded-0">Go to Dashboard</button>
                    </Link>
                </div>
                {ACRDCredit}
            </div>
        )
    };

    return <Base loginRequired>
            <Head>
                <title>Payment Status | Online Payments | Vidyut 2020</title>
            </Head>
            <TitleBar/>
            <div className="d-flex align-items-center justify-content-center bg-gradient" style={{ minHeight: '90vh' }}>
                <div className="card-shadow text-center p-4">
                    {
                       isResponseLoaded ?
                            !transData ?
                                <StatusContainer
                                    animation={require('../../images/animations/payment-failed')}
                                    title="Payment Failed Unexpectedly"
                                    text="Invalid response received from ACRD"
                                />
                       : renderTransactionStatus(transData) : renderFetchingTrans()
                    }
                </div>
            </div>
        </Base>
};

AuthorizePage.getInitialProps = ({ req, query  }) => {
    return { req: {
            headers: req.headers,
            body: req.body
        }
    };
};

export default AuthorizePage;