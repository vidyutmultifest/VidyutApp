import React from 'react'
import Base from '../components/base';
import Head from 'next/head'
import Topbar from "../components/common/topbar";
import MenuBar from "../components/common/menubar";

export default ({ children }) => (
    <Base>
        <Head>
            <title>Login Page | Vidyut 2020</title>
        </Head>
        <Topbar />
        <MenuBar />
        <div className="d-flex align-items-center justify-content-center">
        {children}
        </div>
    </Base>
)