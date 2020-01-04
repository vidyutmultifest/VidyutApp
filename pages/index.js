import React from 'react'
import { useScrollPercentage } from "react-scroll-percentage"
import "../styles/landing.sass";
import "../styles/bootstrap.sass";
import Head from "next/head";
import Link from "next/link";


import Base from "../components/base";
import LandingHeader from "../modules/landing/header";
import AboutTheme from "../modules/landing/aboutTheme";
import AboutVidyut from "../modules/landing/aboutVidyut";
import AboutAmrita from "../modules/landing/aboutAmrita";
import AboutMultifest from "../modules/landing/aboutMultifest";
import SponsorsList from "../modules/landing/sponsors";
import Footer from "../modules/landing/footer";
import QuickActionCards from "../modules/dashboard/QuickActionCards";
import TitleBar from "../components/titleBar";


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
        <TitleBar hideUserDropdown />
        <div id="landing-page-content">
            <LandingHeader />
            <section id="landing-dates">
                <div className="w-100">
                    <h2>January 30 - February 1, 2020</h2>
                    <Link href="/login"><button className="btn btn-primary px-4 py-2">Register Now</button></Link>
                    <div className="p-md-4 mt-4 text-left">
                        <QuickActionCards status={{
                            enableTicketing: true,
                            enableCompetitionRegistration: true,
                            enableWorkshopRegistration: true,
                            enableMerchandiseShopping: true,
                        }} />
                    </div>
                </div>
            </section>
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
