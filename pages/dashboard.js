import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import Link from "next/link";

import Base from "../components/base";
import MyPurchases from "../modules/dashboard/MyPurchases";
import ProfileCard from "../modules/dashboard/ProfileCard";
import dataFetch from "../utils/dataFetch";
import VIDCard from "../modules/dashboard/VIDCard";

import '../styles/dashboard/style.sass'
import TitleBar from "../components/titleBar";
import DashboardFooter from "../modules/dashboard/footer";
import DashboardHeader from "../components/dashboard/dashboardHeader";
import LoadingScreen from "../components/loadingScreen";
import QuickActionCards from "../modules/dashboard/QuickActionCards";
import OptionMenuCards from "../modules/dashboard/OptionMenuCards";
import FeedStories from "../modules/dashboard/feedStories";
import VidyutCountDown from "../modules/dashboard/vidyutCountDown";
import QuickEditCard from "../modules/dashboard/quickEditCard";
import EducationDetails from "../modules/profile/education";
import AmritapurianCard from "../components/dashboard/AmritapurianCard";

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
        rollNo
        shirtSize
        hasEventsRegistered
        college
        {
            id
            name
            location
        }
        photo
        idPhoto
        rollNo
        location
        phone
      }
      myPermissions
      {
        adminAccess
      }
      status
      {
        enableTicketing
        enableWorkshopRegistration
        enableCompetitionRegistration
        enableMerchandiseShopping
        pushNotification
      }
      isProfileComplete
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
                        <FeedStories />
                        <div id="dashboard-wrapper">
                            <div className="container p-0">
                                {
                                    data.status && data.status.pushNotification !== '' ? (
                                        <div className="card-shadow bg-gradient p-3 my-4 mx-0">
                                            <div className="card-shadow p-3">
                                                <h3>Notice</h3>
                                                {data.status.pushNotification}
                                            </div>
                                        </div>
                                    ) : null

                                }
                                <QuickEditCard
                                    collegeID={data.myProfile.college !== null ? data.myProfile.college.id : null}
                                    collegeName={data.myProfile.college !== null ? data.myProfile.college.name : null}
                                    hasEventsRegistered={true}
                                    isAmritapurian={data.myProfile.isAmritapurian}
                                    phone={data.myProfile.phone}
                                    shirtSize={data.myProfile.shirtSize}
                                    rollNo={data.myProfile.rollNo}
                                />
                                {
                                    data.myPermissions && data.myPermissions.adminAccess ? (
                                        <div id="admin-access-prompt" className="card-shadow mx-0">
                                            <h3>You are an Admin Volunteer</h3>
                                            <Link href="/admin"><button className="btn btn-primary px-4 py-2">Go to Admin</button></Link>
                                        </div>
                                    ) : null
                                }
                                {
                                    !data.isProfileComplete ? (
                                        <div id="profile-completion-prompt" className="card-shadow mx-0">
                                            <h3>Complete your profile</h3>
                                            <p>
                                                You need to complete your profile with the required data,
                                                without which your Vidyut ID or purchases/registrations wont
                                                be active.
                                            </p>
                                            <Link href="/profile/edit-profile">
                                                <button className="btn btn-primary px-4 py-2 m-2">Edit Profile</button>
                                            </Link>
                                        </div>
                                    ) : null
                                }
                                <QuickActionCards status={data.status} />
                                <h4 className="px-4 section-heading">My Menu</h4>
                                <OptionMenuCards status={data.status} />
                                <div className="mx-md-4 mx-0 my-4 text-light card-shadow bg-gradient-red p-4">
                                    <h4 className="mt-4">Confused? Need Help?</h4>
                                    <p style={{ fontSize: "0.9rem" }}>
                                        At Vidyut, V care.  You can view our FAQ page to read about common queries, and issues.
                                        We also have dedicated support group on telegram, where our tech team will be always
                                        awake to help you out. Count on us!
                                    </p>
                                    <div className="d-inline-block text-center">
                                        <Link href="/faq">
                                            <a href="/faq">
                                                <button className="btn btn-light btn-shadow font-weight-bold m-2">View FAQ</button>
                                            </a>
                                        </Link>
                                        <a href="https://t.me/vcare2020">
                                            <button className="btn btn-light btn-shadow font-weight-bold m-2">Telegram Chat</button>
                                        </a>
                                        <a href="mailto:vcare@vidyut.amrita.edu">
                                            <button className="btn btn-light btn-shadow font-weight-bold m-2">Send Email</button>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="row m-0">
                                        <div className="col-md-6 py-2">
                                            <MyPurchases />
                                            <VidyutCountDown />
                                        </div>
                                        <div className="col-md-6 py-2">
                                            { data.myProfile.isAmritapurian ? <AmritapurianCard rollNo={data.myProfile.rollNo} /> : null}
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
