import React, {useState} from 'react'
import Head from "next/head";

import '../styles/style.sass';

import ProtectedPage from "./protected";
import dataFetch from "../utils/dataFetch";


const Base = ({ children, loginRequired, adminRequired }) => {

    const page = (
        <React.Fragment>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-151530910-1" />
                <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'UA-151530910-1');`}} />
            </Head>
            {children}
        </React.Fragment>
    );


    return loginRequired ?
        <ProtectedPage>
            {page}
        </ProtectedPage> : page

};

export default Base;