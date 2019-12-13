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
                    <div id="dashboard-wrapper">
                        <DashboardHeader
                            name={data.myProfile.firstName}
                            message="Thank you for showing interest and registering. We are committed to give you an exciting and memorable experience.
                    We look forward to welcome you at Vidyut Multifest 2020, the only one of its kind college festival in India."
                        />
                            <div className="container p-0">
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
                                            {
                                                !data.myProfile.photo ?
                                                    <Link href="profile/upload-selfie">
                                                        <button className="btn btn-primary px-4 py-2">Upload Selfie</button>
                                                    </Link>
                                                    : !data.myProfile.rollNo ?
                                                    <Link href="profile/upload-collegeID">
                                                        <button className="btn btn-primary px-4 py-2">Update College
                                                            Profile
                                                        </button>
                                                    </Link> :
                                                    <Link href="profile/update-phone">
                                                        <button className="btn btn-primary px-4 py-2">Update Phone</button>
                                                    </Link>
                                            }
                                        </div>
                                    ) : null
                                }
                                <QuickActionCards status={data.status} />
                                <h4 className="px-4 section-heading">My Menu</h4>
                                <OptionMenuCards status={data.status} />
                                <div>
                                    <h4 className="px-4 section-heading">My Profile</h4>
                                    <div className="row m-0">
                                        <div className="col-md-6 py-2">
                                            <MyPurchases />
                                        </div>
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
