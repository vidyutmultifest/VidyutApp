import React from 'react'
import 'antd/dist/antd.css';
import Head from "next/head";

import '../styles/style.sass';

import ProtectedPage from "./protected";


const Base = ({ children, loginRequired }) => {

    const page = (
        <React.Fragment>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
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