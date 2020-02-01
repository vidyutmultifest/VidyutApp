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
        enableCheckIn
      }
      myPermissions
      {
        canAcceptPayment
        adminAccess
        canViewRegistrations
        canGeneralCheckIn
        canViewProfiles
        canViewAllTransactions
        canIssueTickets
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
            isLoaded && data.myPermissions ?
                (
                    <React.Fragment>
                        <Topbar/>
                        <MenuBar />
                        <div>
                            <div className="container p-0">
                                <div>
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
                                            data.status.offlinePayment && data.myPermissions.canAcceptPayment ?
                                                <div className="col-md-3 col-6 p-2">
                                                    <QuickActionCard
                                                        photo={require('../images/icons/receive-cash.png')}
                                                        text="Refund Payments"
                                                        title="Issue Refund"
                                                        link="/restricted/issue-refund"
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
                                        data.myPermissions.canViewRegistrations ?
                                            <div className="col-md-3 col-6 p-2">
                                                <QuickActionCard
                                                    photo={require('../images/icons/check-list.png')}
                                                    text="View Competition Stats"
                                                    title="View Competition Stats"
                                                    link="/auth/list/competition"
                                                />
                                            </div> : null
                                    }
                                    {
                                        data.myPermissions.canViewRegistrations ?
                                            <div className="col-md-3 col-6 p-2">
                                                <QuickActionCard
                                                    photo={require('../images/icons/check-list.png')}
                                                    text="View Workshop Stats"
                                                    title="View Workshop Stats"
                                                    link="/auth/list/workshop"
                                                />
                                            </div> : null
                                    }
                                    {
                                        data.myPermissions.canViewAllTransactions ?
                                            <div className="col-md-3 col-6 p-2">
                                                <QuickActionCard
                                                    photo={require('../images/icons/check-list.png')}
                                                    text="View list of all transactions approved by a user"
                                                    title="View Issuer Transactions"
                                                    link="/auth/list/issuer-transactions"
                                                />
                                            </div> : null
                                    }
                                    {
                                        data.status.enableCheckIn && data.myPermissions.canCheckInUsers ?
                                            <div className="col-md-3 col-6 p-2">
                                                <QuickActionCard
                                                    photo={require('../images/icons/qr-scan.png')}
                                                    text="Check-In for proshow, and other events"
                                                    title="Event Check In"
                                                    link="/restricted/view-sessions"
                                                />
                                            </div> : null
                                    }
                                    {
                                        data.status.enableCheckIn && data.myPermissions.canGeneralCheckIn ?
                                            <div className="col-md-3 col-6 p-2">
                                                <QuickActionCard
                                                    photo={require('../images/icons/qr-scan.png')}
                                                    text="General Check-In at registration desk"
                                                    title="General Check In"
                                                    link="/restricted/check-in"
                                                />
                                            </div> : null
                                    }
                                    {
                                        data.myPermissions.canViewProfiles ?
                                            <div className="col-md-3 col-6 p-2">
                                                <QuickActionCard
                                                    photo={require('../images/icons/qr-scan.png')}
                                                    text="View profile of an user"
                                                    title="View Profile"
                                                    link="/restricted/view-profile"
                                                />
                                            </div> : null
                                    }
                                    {
                                        data.myPermissions.canIssueTickets ?
                                            <div className="col-md-3 col-6 p-2">
                                                <QuickActionCard
                                                    photo={require('../images/icons/ticket-issue-icon.png')}
                                                    text="Issue physical pro-show tickets to purchased students"
                                                    title="Issue Tickets"
                                                    link="/restricted/issue-ticket"
                                                />
                                            </div> : null
                                    }
                                    {
                                        data.myPermissions.canGeneralCheckIn ?
                                            <div className="col-md-3 col-6 p-2">
                                                <QuickActionCard
                                                    photo={require('../images/icons/ticket-issue-icon.png')}
                                                    text="Change between events"
                                                    title="Change Event"
                                                    link="/restricted/change-event"
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
                            currentTabName="Dashboard"
                            hideExploreTab
                        />
                    </React.Fragment>
                ) : <LoadingScreen text="Loading Admin Dashboard"/>
        }

    </Base>
};

export default AdminDashboard;
