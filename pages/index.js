import React from "react";
import LanderCover from "../modules/lander/cover";
import Base from "../components/base";
import LanderCountdown from "../modules/lander/countdown";
import LanderAboutVidyut from "../modules/lander/aboutVidyut";
import LazyLoad from 'react-lazyload';
import Head from "next/head";

const LandingPage = () => {

    return <Base>
        <Head>
            <title>Discover Vidyut  - National Level Multi Fest | Amrita Vishwa Vidyapeetham, Amritapuri</title>
        </Head>
        <LazyLoad height="100vh"  >
            <LanderCover  />
        </LazyLoad>
        <LazyLoad height="100vh"  >
            <LanderAboutVidyut />
        </LazyLoad>
        <LanderCountdown />
    </Base>

};

export default LandingPage;