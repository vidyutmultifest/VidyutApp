import React from 'react'
import Head from "next/dist/next-server/lib/head";

import "../styles/errorpage.sass"

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
        </div>
    </div>
};

export default NotFoundPage
