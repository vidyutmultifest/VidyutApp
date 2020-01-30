import React from "react";

import Base from "../components/base";
import Topbar from "../components/common/topbar";
import MenuBar from "../components/common/menubar";
import BottomBar from "../components/common/bottombar";
import Head from "next/head";
import Link from "next/link";

export default () => (
    <Base>
        <Head>
            <title> My Orders | Vidyut 2020 | National Level Multifest - Amrita Vishwa Vidyapeetham, Amritapuri Campus</title>
        </Head>
        <Topbar/>
        <MenuBar/>
        <div className="container p-2">
            <div className="mx-md-4 mx-0 my-4 text-light card-shadow bg-gradient-red p-4">
                <h4 className="mt-4">Confused? Need Help?</h4>
                <p style={{ fontSize: "0.9rem" }}>
                    At Vidyut, V care.  You can view our FAQ page to read about common queries, and issues.
                    We also have dedicated support group on telegram, where our tech team will be always
                    awake to help you out. Count on us!
                    <h4>Phone No: +91 9539932846</h4>
                </p>
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
        <div style={{ height: '20vh' }} />
        <BottomBar
            currentTabIcon={require('../images/icons/support-icon.png')}
            currentTabName="Help"
        />
    </Base>
);