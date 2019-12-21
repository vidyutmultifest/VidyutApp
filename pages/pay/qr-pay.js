import React from "react";
import Head from "next/head";

import Base from "../../components/base";
import TitleBar from "../../components/titleBar";
import DashboardFooter from "../../modules/dashboard/footer";
import PayAtCounterQR from "../../components/purchase/payAtCounterQR";
import {useRouter} from "next/router";
import Cookies from "universal-cookie";


const QRPay = () => {
    const router = useRouter();
    const cookies = new Cookies();

    const transactionID = cookies.get('transactionID');
    const vidyutID = router.query.vidyutID;

    return <Base loginRequired>
        <Head>
            <title> Pay at Counter | QR-based Offline Payment | Vidyut 2020 </title>
        </Head>
        <TitleBar/>
        <div className="container d-flex align-items-center justify-content-center my-4">
            <div className="card-shadow p-4" style={{ maxWidth: '500px' }}>
                <PayAtCounterQR transactionID={transactionID} vidyutID={vidyutID} />
            </div>
        </div>
        <DashboardFooter/>
    </Base>
};

export default QRPay;