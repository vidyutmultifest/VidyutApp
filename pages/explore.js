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