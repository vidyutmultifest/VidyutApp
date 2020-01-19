import React from "react";

import Base from "../components/base";
import Topbar from "../components/common/topbar";
import MenuBar from "../components/common/menubar";
import BottomBar from "../components/common/bottombar";
import PurchaseHistory from "../components/cards/purchaseHistory";
import Head from "next/head";

export default () => (
    <Base loginRequired>
        <Head>
            <title> My Orders | Vidyut 2020 | National Level Multifest - Amrita Vishwa Vidyapeetham, Amritapuri Campus</title>
        </Head>
        <Topbar/>
        <MenuBar/>
        <div className="container p-0">
            <h4 className="p-2">My Orders</h4>
            <PurchaseHistory />
        </div>
        <div style={{ height: '20vh' }} />
        <BottomBar
            currentTabIcon={require('../images/icons/order-bottom-bar-icon.png')}
            currentTabName="Orders"
        />
    </Base>
);