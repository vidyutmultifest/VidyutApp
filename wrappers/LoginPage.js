import React from 'react'
import Base from '../components/base';
import Head from 'next/head'
import DashboardFooter from "../modules/dashboard/footer";

export default ({ children }) => (
    <Base>
        <Head>
            <title>Login Page | Vidyut 2020</title>
        </Head>
        <div style={{ height: '100vh'}}>
            <div className="bg-gradient d-flex align-items-center justify-content-center" style={{ height: '100vh'}}>
                {children}
            </div>
        </div>
    </Base>
)