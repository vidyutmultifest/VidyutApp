import React from 'react'
import {useRouter} from "next/router";
import Head from 'next/head'
import TitleBar from "../components/titleBar";
import Base from "../components/base";
import QuickActionCard from "../components/dashboard/QuickActionCard";

const AdminDashboard = () => {
    const router = useRouter();
    console.log(router.route);
    return <Base loginRequired>
        <Head>
            <title>Dashboard | Vidyut 2020</title>
        </Head>
        <TitleBar />
        <div className="container p-0">
            <div>
                <h4 className="px-4 mt-4 section-heading">Quick Actions</h4>
                <div className="row m-0 pb-4">
                    <div className="col-md-3 col-6 p-2">
                        <QuickActionCard
                            photo={require('../images/icons/tickets-qa.png')}
                            text="Scan & Accept Payment"
                            title="Accept Payment"
                            link="/restricted/accept-payment"
                        />
                    </div>
                </div>
            </div>
        </div>
    </Base>
};

export default AdminDashboard;
