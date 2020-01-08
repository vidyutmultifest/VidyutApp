import React from "react";
import LanderCover from "../modules/lander/cover";
import Base from "../components/base";
import LanderCountdown from "../modules/lander/countdown";
import LanderAboutVidyut from "../modules/lander/aboutVidyut";
import LazyLoad from 'react-lazyload';
import Head from "next/head";
import LanderHealTheWorld from "../modules/lander/healTheWorld";
import LanderHighlights from "../modules/lander/highlights";
import LanderSponsors from "../modules/lander/sponsors";
import LanderTrailer from "../modules/lander/trailer";

const LandingPage = () => {

    return <Base>
        <Head>
            <title>Discover Vidyut  - National Level Multi Fest | Amrita Vishwa Vidyapeetham, Amritapuri</title>
        </Head>
        <LazyLoad height="100vh" unmountIfInvisible >
            <LanderCover  />
        </LazyLoad>
        <LazyLoad height="100vh" unmountIfInvisible  >
            <LanderAboutVidyut />
        </LazyLoad>
        <LazyLoad height="40vh" unmountIfInvisible  >
            <LanderTrailer />
        </LazyLoad>
        <LazyLoad height="50vw"  unmountIfInvisible >
            <LanderHighlights />
        </LazyLoad>
        <LazyLoad height="100vh" unmountIfInvisible  >
            <LanderHealTheWorld />
        </LazyLoad>
        <LazyLoad height="45vw" unmountIfInvisible>
            <LanderSponsors />
        </LazyLoad>
        <LazyLoad height="50vw" unmountIfInvisible>
            <LanderCountdown />
        </LazyLoad>
    </Base>

};

export default LandingPage;