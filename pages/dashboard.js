import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import Link from "next/link";

import Base from "../components/base";
import MyPurchases from "../modules/dashboard/MyPurchases";
import ProfileCard from "../modules/dashboard/ProfileCard";
import dataFetch from "../utils/dataFetch";
import VIDCard from "../modules/dashboard/VIDCard";

import '../styles/dashboard/style.sass'
import QuickActionCard from "../components/dashboard/QuickActionCard";
import TitleBar from "../components/titleBar";
import DashboardFooter from "../modules/dashboard/footer";
import DashboardHeader from "../components/dashboard/dashboardHeader";
import LoadingScreen from "../components/loadingScreen";

const Dashboard = () => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);

    const query = `{
      myProfile
      {
        vidyutID
        vidyutHash
        username
        firstName
        lastName
        isAmritian
        isAmritapurian
        college
        {
            name
            location
        }
        photo
        location
        phone
      }
      myPermissions
      {
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
                <title>Dashboard | Vidyut 2020</title>
            </Head>

            {
                isLoaded ? (
                    <div>
                    <TitleBar />
                    <div id="dashboard-wrapper">
                        <DashboardHeader
                            name={data.myProfile.firstName}
                            message="Thank you for showing interest and registering. We are committed to give you an exciting and memorable experience.
                    We look forward to welcome you at Vidyut Multifest 2020, the only one of its kind college festival in India."
                        />
                        <div className="container p-0">
                            {
                                data.myPermissions && data.myPermissions.adminAccess ? (
                                    <div id="admin-access-prompt" className="card-shadow">
                                        <h3>You are an Admin Volunteer</h3>
                                        <Link href="/admin"><button className="btn btn-primary px-4 py-2">Go to Admin</button></Link>
                                    </div>
                                ) : null
                            }
                            <div>
                                <h4 className="px-4 mt-4 section-heading">Quick Actions</h4>
                                <div className="row m-0 p-0">
                                    <div className="col-md-3 col-6 p-2">
                                        <QuickActionCard
                                            photo={require('../images/icons/tickets-qa.png')}
                                            text="Concert, Choreo, Expo & More"
                                            title="Book Tickets"
                                            offer="Early Bird Offer"
                                            link="/shows"
                                        />
                                    </div>
                                    <div className="col-md-3 col-6 p-2">
                                        <QuickActionCard
                                            photo={require('../images/icons/trophy-events.png')}
                                            text="100+ Competitions, starting at Rs.100"
                                            title="Participate in Competitions"
                                            link="/competitions"
                                        />
                                    </div>
                                    <div className="col-md-3 col-6 p-2">
                                        <QuickActionCard
                                            photo={require('../images/icons/classroom.png')}
                                            text="50+ Workshops, starting at Rs.500"
                                            title="Register for Workshops"
                                            link="/workshops"
                                        />
                                    </div>
                                    <div className="col-md-3 col-6 p-2">
                                        <QuickActionCard
                                            photo={require('../images/icons/t-shirt.png')}
                                            text="T-shirts, goodies and more"
                                            title="Buy Merchandise"
                                            link="/merchandise"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="px-4 section-heading">Profile</h4>
                                <div className="row m-0">
                                    <div className="col-md-6 py-2"><MyPurchases /></div>
                                    <div className="col-md-6 py-2">
                                        <VIDCard vid={data.myProfile.vidyutID} vhash={data.myProfile.vidyutHash ? data.myProfile.vidyutHash : '123'} />
                                        <ProfileCard data={data.myProfile} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DashboardFooter />
                    </div>
                ) : <LoadingScreen text="Loading Dashboard"/>
            }
        </Base>
};

export default Dashboard;
