import React from 'react'
import Head from "next/dist/next-server/lib/head";

import "../styles/errorpage.sass"
import Link from "next/link";

const NotFoundPage = () => {
    return <div id="not-found-page" className="bg-gradient">
        <Head>
            <title>Page Not Found | Vidyut 2020</title>
        </Head>
        <div className="container">
            <h1>Page Not Found</h1>
            <p>
                This page does not exist or has been moved. Please check the url,
                if you think this is due to a error please contact web@vidyut.amrita.edu.
            </p>
            <Link href="/">
                <a><div className="btn btn-light btn-shadow px-4 m-2 py-2">Home</div></a>
            </Link>
            <Link href="/dashboard">
                <a><div className="btn btn-light btn-shadow px-4 m-2 py-2">Dashboard</div></a>
            </Link>
        </div>
    </div>
};

export default NotFoundPage
