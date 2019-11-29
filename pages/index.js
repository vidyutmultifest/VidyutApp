import React from 'react'
import { useScrollPercentage } from "react-scroll-percentage"
import "../styles/landing.sass";
import "../styles/bootstrap.sass";
import Head from "next/head";


import Base from "../components/base";
import LandingHeader from "../modules/landing/header";
import AboutTheme from "../modules/landing/aboutTheme";
import AboutVidyut from "../modules/landing/aboutVidyut";
import AboutAmrita from "../modules/landing/aboutAmrita";
import AboutMultifest from "../modules/landing/aboutMultifest";
import SponsorsList from "../modules/landing/sponsors";
import Footer from "../modules/landing/footer";


const HomePage = () => {
    const [ref, percentage] = useScrollPercentage({
        threshold: 0,
    });

    const movingbg = (
        <div className="moving-bg-wrapper">
            <div
                className="moving-bg"
                style={{
                    backgroundImage: `url(${require('../images/assets/amritapuri_illus.png')})`,
                    backgroundPositionX: `calc(50vw - ${percentage}*2200px)`,
                    backgroundRepeat: 'repeat-x'
                }}
            />
        </div>
    );

    return <Base>
        <Head>
            <title>Discover Vidyut  - National Level Multi Fest | Amrita Vishwa Vidyapeetham, Amritapuri</title>
        </Head>
        <div id="landing-page-content">
            <LandingHeader />
            <div ref={ref}>
                <AboutTheme />
                <AboutVidyut />
                <AboutMultifest />
                {movingbg}
                <AboutAmrita />
                <SponsorsList />
            </div>
            <Footer />
        </div>
    </Base>
};

export default HomePage
