import React, {useEffect, useState} from 'react'
import Base from "../components/base";
import dataFetch from "../utils/dataFetch";
import Head from "next/head";

import '../styles/events/style.sass';
import '../styles/bootstrap.sass';
import EventCard from "../components/events/card";
import TitleBar from "../components/titleBar";
import StatusContainer from "../components/StatusContainer";
import LoadingScreen from "../components/loadingScreen";
import DashboardFooter from "../modules/dashboard/footer";
import CategoryEventLister from "../components/events/categoryEventLister";

const Shows = () => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);
    const [profileData, setProfileData] = useState(false);


    const query = `{
      myProfile
      {
        isAmritian
        isAmritapurian
        isFaculty
        isSchoolStudent
        hasEventsRegistered
      }
      listByCategory
      {
        name
        slug
        ticketEvents
        {
            name
            cover
            description
            fee
            slug
            isNew
            isRecommended
            products
            {
               productID
               name
               price
               isAvailable
               isOutsideOnly
               requireEventRegistration
               requireRegistration
               isGSTAccounted
               isAmritapurianOnly
               isFacultyOnly
               isSchoolOnly  
            }
        }
      }
    }`;

    const getShowList = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried) {
            getShowList().then((response) =>{
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.listByCategory);
                    setProfileData(response.data.myProfile);
                    setLoaded(true);
                }
            })
        }
    });

    return <Base>
        <Head>
            <title>Shows | Vidyut 2020</title>
        </Head>
        {
            isLoaded ?
                <React.Fragment>
                    <TitleBar
                        breadcrumbs={[
                            {
                                name: "Shows",
                                link: '/shows',
                                active: true
                            },
                        ]}
                    />
                    {
                        profileData && !profileData.hasEventsRegistered && profileData.isAmritapurian ?
                            <div className="bg-gradient-red card-shadow text-light p-4 m-2">
                                <h4>Register for a Technical Event</h4>
                                <p>
                                    You need to register for a competition or workshop first before purchasing
                                    Vidyut Proshow tickets. All Play and No Work makes Jack a Dull Boy.
                                </p>
                                <div>
                                    <a href="/workshop">
                                        <button className="btn btn-shadow btn-light px-4 py-2 m-2">View Workshops</button>
                                    </a>
                                    <a href="/competitions">
                                        <button className="btn btn-shadow btn-light px-4 py-2 m-2">View Competitions</button>
                                    </a>
                                </div>
                            </div> : null
                    }
                    {data.length > 0 ?
                        <div className="row m-0">
                            <div id="event-listing" className="col-12">
                                <div className="row m-0">
                                    {
                                        data.map(c =>
                                                <CategoryEventLister
                                                    name={c.name}
                                                    slug={c.slug}
                                                    isOpen
                                                    shows={c.ticketEvents}
                                                    profileData={profileData}
                                                />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        : <div className="container d-flex justify-content-center  align-items-center"
                               style={{minHeight: '90vh'}}>
                            <StatusContainer
                                title="No Shows Listed"
                                image={require('../images/illus/cleanup.png')}
                                text="We have not listed any shows for Vidyut 2020 at this moment, do check back later."
                            />
                        </div>
                    }
                    <DashboardFooter />
                </React.Fragment>
                : <LoadingScreen text="Loading Shows"/>
        }
    </Base>
};

export default Shows
