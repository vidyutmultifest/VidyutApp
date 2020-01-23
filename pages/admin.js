import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import TitleBar from "../components/titleBar";
import Base from "../components/base";
import QuickActionCard from "../components/dashboard/QuickActionCard";
import DashboardHeader from "../components/dashboard/dashboardHeader";
import dataFetch from "../utils/dataFetch";

import '../styles/dashboard/style.sass'
import '../styles/bootstrap.sass';
import LoadingScreen from "../components/loadingScreen";
import PaymentCollectionSummary from "../components/admin/PaymentCollectionSummary";
import DashboardFooter from "../modules/dashboard/footer";
import Topbar from "../components/common/topbar";
import MenuBar from "../components/common/menubar";
import BottomBar from "../components/common/bottombar";

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
      getTransactionsPendingCount
      status
      {
        offlinePayment
      }
      myPermissions
      {
        canAcceptPayment
        adminAccess
        canViewRegistrations
        canCheckInUsers
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
        {
            isLoaded && data.myPermissions.adminAccess ?
                (
                    <React.Fragment>
                        <Topbar/>
                        <MenuBar />
                        <div>
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
                                    {
                                        data.myPermissions.canViewRegistrations ?
                                            <div className="col-md-3 col-6 p-2">
                                                <QuickActionCard
                                                    photo={require('../images/icons/check-list.png')}
                                                    text="View registrations for events you manage"
                                                    title="View Registrations"
                                                    link="/auth/registrations/list"
                                                />
                                            </div> : null
                                    }
                                    {
                                        data.myPermissions.canViewRegistrations ?
                                            <div className="col-md-3 col-6 p-2">
                                                <QuickActionCard
                                                    photo={require('../images/icons/check-list.png')}
                                                    text="View Proshow Stats"
                                                    title="View Proshow Stats"
                                                    link="/auth/list/proshow"
                                                />
                                            </div> : null
                                    }
                                    {
                                        data.myPermissions.canCheckInUsers ?
                                            <div className="col-md-3 col-6 p-2">
                                                <QuickActionCard
                                                    photo={require('../images/icons/qr-code.png')}
                                                    text="Check-In Users"
                                                    title="Check In"
                                                    link="/restricted/view-sessions"
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
                                                    <PaymentCollectionSummary
                                                        amount={data.getAmountCollected}
                                                        transactionCount={data.getTransactionsApprovedCount}
                                                        pendingCount={data.getTransactionsPendingCount}
                                                    />
                                                </div>
                                            ) : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <BottomBar
                            currentTabIcon={require('../images/icons/dashboard-bottom-bar-icon.png')}
                            currentTabName="Admin"
                        />
                    </React.Fragment>
                ) : <LoadingScreen text="Loading Admin Dashboard"/>
        }

    </Base>
};

export default AdminDashboard;
