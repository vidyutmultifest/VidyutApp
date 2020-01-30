import React from "react";

import Base from "../components/base";
import Topbar from "../components/common/topbar";
import MenuBar from "../components/common/menubar";

import '../styles/bootstrap.sass'
import Slideshow from "../components/common/slideshow";
import DashboardListing from "../modules/dashboard/listing";
import BottomBar from "../components/common/bottombar";
import Head from "next/head";
import FeedStories from "../modules/dashboard/feedStories";

const ExplorePage  = () => {
    return (
        <Base id="dashboard">
            <Head>
                <title> Explore Vidyut 2020 | National Level Multifest - Amrita Vishwa Vidyapeetham, Amritapuri Campus</title>
            </Head>
            <Topbar/>
            <MenuBar/>
            <div style={{ backgroundColor: '#311B92' }} className="font-weight-bold text-light p-2 text-center">
                Reporting time for Proshow/Revel is 04:00 PM. Please bring your QR Code + ID Card + Ticket.
                <a
                    target="_blank"
                    href="https://drive.google.com/file/d/10j6LTVvQ8UkyuwTW5NXEyPh4EnoVBWz7/view?usp=drivesdk"
                    className="text-light font-weight-bold">Download event schedule from here.</a>
            </div>
            <FeedStories />
            <Slideshow feedSlug="home" />
            <div className="container p-0">
                <DashboardListing/>
            </div>
            <BottomBar
                currentTabName="Explore"
                currentTabIcon={require('../images/icons/explore-icon.png')}
                hideExploreTab
            />
        </Base>
    )
};

export default ExplorePage;