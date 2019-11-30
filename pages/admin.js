import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import TitleBar from "../components/titleBar";
import Base from "../components/base";
import QuickActionCard from "../components/dashboard/QuickActionCard";
import DashboardHeader from "../components/dashboard/dashboardHeader";
import dataFetch from "../utils/dataFetch";

import '../styles/dashboard/style.sass'

const AdminDashboard = () => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);

    const query = `{
      myProfile
      {
        firstName
        lastName
      }
      getAmountCollected
      getTransactionsApprovedCount
      status
      {
        offlinePayment
      }
      myPermissions
      {
        canAcceptPayment
        adminAccess
      }
    }`;

    const getProfile = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried)
        {
            getProfile().then(  response => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data);
                    setLoaded(true);
                }
            })
        }
    });

    return <Base loginRequired>
        <Head>
            <title>Admin Dashboard | Vidyut 2020</title>
        </Head>
        <TitleBar />
        {
            isLoaded && data.myPermissions.adminAccess ?
                (
                    <div>
                        <DashboardHeader
                            name={data.myProfile.firstName}
                            message="Thank you for volunteering for Vidyut 2020. Let's work together, and strive hard to make Vidyut 2020 a grand success."
                        />
                        <div className="container p-0">
                            <div>
                                <h4 className="px-4 mt-4 section-heading">Quick Actions</h4>
                                <div className="row m-0 pb-4">
                                {
                                    data.status.offlinePayment && data.myPermissions.canAcceptPayment ?
                                        <div className="col-md-3 col-6 p-2">
                                            <QuickActionCard
                                                photo={require('../images/icons/receive-cash.png')}
                                                text="Scan & Accept Payment"
                                                title="Accept Payment"
                                                link="/restricted/accept-payment"
                                            />
                                        </div> : null
                                }
                                </div>
                            </div>
                            <div>
                                <h4 className="px-4 section-heading">Profile</h4>
                                <div className="row m-0">
                                    {
                                        data.myPermissions.canAcceptPayment ? (
                                            <div className="col-md-6 py-2">
                                                <div className="card-shadow">
                                                    <h3>Transactions Summary</h3>
                                                    <div className="row m-0">
                                                        <div className="col-md-6">
                                                            Rs. {data.getAmountCollected}
                                                        </div>
                                                        <div className="col-md-6">
                                                            {data.getTransactionsApprovedCount}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
        }

    </Base>
};

export default AdminDashboard;
