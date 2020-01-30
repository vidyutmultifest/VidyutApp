import React from "react";
import Topbar from "../components/common/topbar";
import MenuBar from "../components/common/menubar";
import BottomBar from "../components/common/bottombar";
import Head from "next/head";
import Base from "../components/base";
import LanderSponsors from "../modules/lander/sponsors";

const sponsors = () => {

    return <Base>
        <Head>
            <title>Our Sponsors | Vidyut 2020</title>
        </Head>
        <Topbar/>
        <MenuBar/>
        <LanderSponsors/>
        <BottomBar />
    </Base>
};

export default sponsors;