import React from "react";

import Base from "../components/base";
import Topbar from "../components/common/topbar";
import MenuBar from "../components/common/menubar";

import '../styles/bootstrap.sass'
import Slideshow from "../components/common/slideshow";
import DashboardListing from "../modules/dashboard/listing";
import BottomBar from "../components/common/bottombar";
import Head from "next/head";

export default () => {
    return (
        <Base id="dashboard">
            <Head>
                <title> My Dashboard | Vidyut 2020 | National Level Multifest - Amrita Vishwa Vidyapeetham, Amritapuri Campus</title>
            </Head>
            <Topbar/>
            <MenuBar/>
            <Slideshow feedSlug="home" />
            <div className="container p-0">
                <DashboardListing/>
            </div>
            <div style={{ height: '20vh' }} />
            <BottomBar
                currentTabName="Dashboard"
                currentTabIcon={require('../images/icons/dashboard-bottom-bar-icon.png')}
            />
        </Base>
    )
}