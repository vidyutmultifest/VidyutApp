import React, {useEffect, useState} from 'react'
import Head from 'next/head'

import Base from "../components/base";
import MyPurchases from "../modules/dashboard/MyPurchases";
import ProfileCard from "../modules/dashboard/ProfileCard";
import dataFetch from "../utils/dataFetch";
import VIDCard from "../modules/dashboard/VIDCard";
import DashboardHeader from "../modules/dashboard/header";

import '../styles/dashboard/style.sass'
import QuickActionCard from "../components/dashboard/QuickActionCard";
import TitleBar from "../components/titleBar";
import DashboardFooter from "../modules/dashboard/footer";

const Dashboard = () => {

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
    }`;

    const getProfile = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isLoaded)
        {
            getProfile().then(  response => {
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setLoaded(true);
                    setData(response.data.myProfile);
                }
            })
        }
    });

    return <Base loginRequired>
            <Head>
                <title>Dashboard | Vidyut 2020</title>
            </Head>
            <TitleBar />
            <div id="dashboard-wrapper">
                <DashboardHeader data={data} />
                <div className="container p-0">
                    <div>
                        <h4 className="px-4 mt-4 section-heading">Quick Actions</h4>
                        <div className="row m-0 pb-4">
                            <div className="col-md-3 col-6 p-2">
                                <QuickActionCard
                                    photo={require('../images/icons/tickets-qa.png')}
                                    text="Nucleya, Agam + More"
                                    title="Book Proshow Tickets"
                                    offer="Early Bird Offer"
                                    link="/purchase/proshow-tickets"
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
                                { isLoaded ?
                                    <React.Fragment>
                                        <VIDCard vid={data.vidyutID} vhash={data.vidyutHash ? data.vidyutHash : '123'} />
                                        <ProfileCard data={data} />
                                    </React.Fragment>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DashboardFooter />
        </Base>
};

export default Dashboard;
