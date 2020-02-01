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
import BottomBar from "../../components/common/bottombar";
import Topbar from "../../components/common/topbar";
import MenuBar from "../../components/common/menubar";

const IssueRefund = () => {

    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState();
    const [qrScanned, setQrScanned] = useState(false);
    const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false});

    const issueRefundMutation = `mutation issueRefund($amount: Int!, $transactionID: String!)
    {
      refundTransaction(amount: $amount, transactionID: $transactionID)
    }`;

    const getRefundsQuery = `query getRefunds($hash: String!){
      getRefunds(hash: $hash)
      {
        product
        amount
        isOnline
        hasRefunded
        userName
        transaction
      }
    }`;

    const getRefund = async variables => await dataFetch({ query: getRefundsQuery, variables });
    const issueRefund = async variables => await dataFetch({ query: issueRefundMutation, variables });


    useEffect(() => {
        if(typeof window != "undefined") { setLoaded(true); }
    });

    const scanRefund = (hash) => {
        getRefund({ hash: hash }).then((response) =>{
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                setData(response.data.getRefunds);
                setLoaded(true);
            }
        });
    };

    const confirmRefund = (transactionID, amount) => {
        issueRefund({
            transactionID: transactionID,
            amount: amount,
        }).then((response) =>{
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                setQrScanned(false);
                setLoaded(false);
                setData(false);
            }
        });
    };

    const handleScan = data => {
        if(data!=null)
        {
            setQrScanned(true);
            scanRefund(data);
        }
    };

    const renderRefundDetails = () => (
        <div id="accept-payment-confirmation">
            {
                !data.hasRefunded ?
                    <div className="p-4">
                        <h2 className="text-success">Allow Refund</h2>
                        <h1 className="mb-0">₹{data.amount}</h1>
                        <h3>{data.product}</h3>
                        <h4>{data.userName}</h4>
                        <div
                            onClick={() => confirmRefund(data.transaction, data.amount)}
                            className="btn btn-success px-4 py-2"
                        >
                            Pay Refund
                        </div>
                        <button
                            className="btn btn-danger py-2 m-2 px-4"
                            onClick={() => {
                                setQrScanned(false);
                                setLoaded(false);
                                setData(false);
                            }}
                        >
                            Rescan QR
                        </button>
                    </div> :
                    <div className="p-4">
                        <h1>Already Refunded / Not Valid</h1>
                        <button
                            className="btn btn-primary py-2 m-2 px-4"
                            onClick={() => {
                                setQrScanned(false);
                                setLoaded(false);
                                setData(false);
                            }}
                        >
                            Rescan QR
                        </button>
                    </div>
            }

        </div>
    );

    return <Base loginRequired>
        <Head>
            <title>Issue Refund | Admin | Vidyut 2020</title>
        </Head>
        <Topbar/>
        <MenuBar/>
        <AdminRequired>
        <div className="container p-4">
            <div id="accept-payment-card" className="card-shadow">
                {isLoaded && data ? renderRefundDetails() : null}
            </div>
        </div>
        {
            !qrScanned ?
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
                </div> : null
        }
        </AdminRequired>
        <BottomBar
            hideExploreTab
            currentTabName="Refund"
            currentTabIcon={require('../../images/icons/order-bottom-bar-icon.png')}
        />
    </Base>
};

export default IssueRefund;