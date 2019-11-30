import React from 'react'
import Base from '../components/base';
import Head from 'next/head'

export default ({ children }) => (
    <Base>
        <Head>
            <title>Login Page | Vidyut 2020</title>
        </Head>
        <div className="container">
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh'}}>
                <div className="row m-0 w-100">
                    <div className="col-lg-8 col-md-6"/>
                    <div className="col-lg-4 col-md-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </Base>
)