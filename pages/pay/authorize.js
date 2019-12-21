import React, {useEffect, useState} from "react";
import Base from "../../components/base";
import TitleBar from "../../components/titleBar";
import dataFetch from "../../utils/dataFetch";
import {useRouter} from "next/router";
import Cookies from "universal-cookie";
import LoadingScreen from "../../components/loadingScreen";
import Lottie from "react-lottie";
import Head from "next/head";

const cookies = new Cookies();

const AuthorizePage = () => {
    const router = useRouter();
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [isResponseLoaded, setResponseLoaded] = useState(false);
    const [data, setData] = useState(false);
    const transactionID = cookies.get('transactionID');
    const [transData, setTransData] = useState(false);
    const [isFetchingTrans, setFetchingTrans] = useState(false);

    const getTrans = `query getTrans($transactionID: String){
      getPaymentGatewayData(transactionID: $transactionID)
      {
        url
        data
        code
      }
    }`;

    const getStatus = `query getStatus($transactionID: String){
      getOnlinePaymentStatus(transactionID: $transactionID)
      {
        status
        data
      }
    }`;

    const getTransData = async variables => await dataFetch({ query: getTrans, variables });
    const getStatusData = async variables => await dataFetch({ query: getStatus, variables });

    useEffect(() => {
        if(router.query.transactionID !== undefined)
        {
            const variables = {
                transactionID: router.query.transactionID
            };
            if(!isQueried)
            {
                cookies.set('transactionID', router.query.transactionID, { path: '/' });
                getTransData(variables).then(  response => {
                    setQueried(true);
                    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                        setData(response.data.getPaymentGatewayData);
                        setLoaded(true);
                    }
                })
            }
        } else {
            if(!isQueried)
            {
                setFetchingTrans(true);
                getStatusData({transactionID}).then((response) => {
                    setQueried(true);
                    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                        setTransData(response.data.getOnlinePaymentStatus);
                        setResponseLoaded(true);
                        setFetchingTrans(false);
                    }
                });
            }
        }
    });

    const ACRDCredit = (
        <div className="text-center mt-4">
            <div className="font-weight-bold mb-4">Payment Partner</div>
            <img src={require('../../images/logos/acrd-logo.jpg')} style={{ width: "250px"}} />
        </div>
    );

    const renderTransactionStatus = (msg) => {
        const transactionDetails = JSON.parse(JSON.parse(msg));
        return transactionDetails.status === "SUCCESS" ?
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
                <div className="alert alert-success text-left">
                    <div><b>Transaction ID</b>: {transactionDetails.transactionId}</div>
                    <div><b>Amount</b>: {transactionDetails.amount} {transactionDetails.currency}</div>
                    <div><b>Bank Reference Number</b>:{ transactionDetails.bankrefno}</div>
                </div>
                {ACRDCredit}
            </div> : <div>
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: require('../../images/animations/payment-failed'),
                    }}
                    height={400}
                    width={400}
                />
                <h1>Payment Failed/Pending</h1>
                <p>{transactionDetails.statusDesc}</p>
                <div className="alert alert-warning text-left">
                    <div><b>Message</b>: {transactionDetails.statusDesc}</div>
                    <div><b>Transaction ID</b>: {transactionDetails.transactionId}</div>
                    <div><b>Amount</b>: {transactionDetails.amount} {transactionDetails.currency.toUpperCase()}</div>
                    <div><b>Bank Reference Number</b>:{transactionDetails.bankrefno}</div>
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
                    height={400}
                    width={400}
                />
                <h1>Fetching Transaction Details</h1>
                <p>
                    We are awaiting the response from ACRD payment gateway for getting status of your transaction <b>{transactionID}</b>.
                    It might take upto few minutes for them to confirm your payment, and <b>you can check back later in
                    your dashboard to review the status of your payment.</b>
                </p>
                {ACRDCredit}
            </div>
        )
    };

    return <Base loginRequired>
            <Head>
                <title>Online Payments | Powered by ACRD | Vidyut 2020</title>
            </Head>
            <TitleBar/>
            <div className="d-flex align-items-center justify-content-center bg-gradient" style={{ minHeight: '90vh' }}>
                <div className="card-shadow text-center p-4">
                    {
                        isFetchingTrans ?
                            renderFetchingTrans()
                            : isResponseLoaded ? renderTransactionStatus(transData.data)
                        : isLoaded && data ? (
                            <React.Fragment>
                                <h4>Proceed to Payment Gateway</h4>
                                <img src={require('../../images/logos/acrd-logo.jpg')}  className="my-4" style={{ width: '300px' }}/>
                                <p style={{ maxWidth: "600px"}}>
                                    Online Payments for Vidyut 2020 is handled by Amrita Centre for Research and Development.
                                    On clicking proceed to pay button, you will be directed to their payment gateway that
                                    supports debit/credit cards, and net-banking.
                                </p>
                                <div className="alert alert-warning">
                                    <b>TransactionID:</b> VIDYUT{router.query.transactionID}
                                </div>
                                <form method="POST" action={data.url}>
                                    <input type="hidden" value={data.data} name="encdata" id="encdata" />
                                    <input type="hidden" value={data.code} name="code" id="code" />
                                    <button className="btn btn-primary rounded-0 px-4 py-3 font-weight-bold" type="submit" id="pay">Proceed to Pay</button>
                                </form>
                            </React.Fragment>
                        ) : <LoadingScreen text="Loading Payment Gateway" />
                    }

                </div>
            </div>
        </Base>
};

export default AuthorizePage;