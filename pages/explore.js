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
import Link from "next/link";

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
                <div className="container p-2">
                    <div className="mx-md-4 mx-0 my-4 text-light card-shadow bg-gradient-red p-4">
                        <h4 className="mt-4">Confused? Need Help?</h4>
                        <div style={{ fontSize: "0.9rem" }}>
                            May i help you desk is now open near the Registration counter and the lobby reception
                            For all your queries regarding venue, proshows and all technical and non technical events, contact your nearest May I Help you desk
                            <div>Contact</div>
                            <h6>Amritesh</h6>
                            <h4>Phone No: +91 9539932846</h4>
                        </div>
                        <div className="d-inline-block text-center">
                            <Link href="/faq">
                                <a href="/faq">
                                    <button className="btn btn-light btn-shadow font-weight-bold m-2">View FAQ</button>
                                </a>
                            </Link>
                            <a href="https://t.me/vcare2020">
                                <button className="btn btn-light btn-shadow font-weight-bold m-2">Telegram Chat</button>
                            </a>
                            <a href="mailto:vcare@vidyut.amrita.edu">
                                <button className="btn btn-light btn-shadow font-weight-bold m-2">Send Email</button>
                            </a>
                        </div>
                    </div>
                </div>
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