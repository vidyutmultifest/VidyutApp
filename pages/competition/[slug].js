import React, {useEffect, useState} from "react";
import Base from "../../components/base";
import { useRouter } from 'next/router';
import dataFetch from "../../utils/dataFetch";
import Head from "next/head";
import TitleBar from "../../components/titleBar";
import EventHeaderCard from "../../components/events/headerCard";
import ShareCard from "../../components/events/shareCard";
import classNames from 'classnames';

import '../../styles/events/style.sass';
import PrizesCard from "../../modules/events/prizesCard";

import DashboardFooter from "../../modules/dashboard/footer";
import ContactCard from "../../modules/events/contactCard";
import TeamSpecifierCard from "../../modules/events/teamSpecCard";
import OrganizerCard from "../../modules/events/organizerCard";

const Workshop = () => {
    const router = useRouter();
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState();

    const [showMoreState, setShowMoreState] = useState(false);

    const query = `{
      getCompetition(slug: "${router.query.slug}")
      {
        name
        slug
        cover
        details
        description
        fee
        department
        {
           name
        }
        products
        {
           productID
           name
           price
           isAvailable
           isOutsideOnly
           requireRegistration
           isGSTAccounted
           isAmritapurianOnly
           isFacultyOnly
           isSchoolOnly  
        }
        organizer
        {
          name
          logo
        }
        firstPrize
        secondPrize
        thirdPrize
        minTeamSize
        maxTeamSize
        isTeamEvent
        contacts 
        {
           name
           email
           phone
        }
      }
    }`;

    const getDetails = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried && router.query.slug !== undefined) {
            getDetails().then((response) => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.getCompetition);
                    setLoaded(true);
                }
            })
        }

    });

    const eventDetails = () => data.details && data.details.length > 0 ? (
        <div id="event-details-card" className="card-shadow">
            <h3>Competition Details</h3>
            <div className={classNames('wrapper', showMoreState ? 'show-all' : null)}>
                <div dangerouslySetInnerHTML={{ __html: data.details}} />
            </div>
            {
                !showMoreState ?
                    <div className="show-more-hover mt-4 btn btn-primary px-4 py-2" onClick={() => setShowMoreState(true)}>Show More</div>
                    :  <div className="show-more-hover mt-4 btn btn-primary px-4 py-2" onClick={() => setShowMoreState(false)}>Show Less</div>

            }
        </div>
    ) : null;

    return <Base>
        <Head>
            <title> { isLoaded ? data.name : router.query.slug } - Competition | Vidyut 2020 </title>
        </Head>
        <TitleBar
            breadcrumbs={[
                {
                    name: "Competitions",
                    link: '/competitions'
                },
                {
                    name:  isLoaded ? data.name : router.query.slug,
                    link: router.query.slug,
                    active: true
                },
            ]}
        />
        { isLoaded ? (
            <div className="container p-0">
                <EventHeaderCard
                    cover={data.cover}
                    name={data.name}
                    dept={data.department.name}
                    text={data.description}
                    products={data.products}
                />
                <div className="row m-0">
                    <div className="col-md-7 col-xl-8 p-md-4 p-0 my-4">
                        {eventDetails()}
                    </div>
                    <div className="col-md-5 col-xl-4 p-md-4 mb-4">
                        <PrizesCard
                            firstPrize={data.firstPrize}
                            secondPrize={data.secondPrize ? data.secondPrize : null}
                            thirdPrize={data.thirdPrize ? data.thirdPrize : null}
                        />
                        {
                            data.isTeamEvent ? <TeamSpecifierCard
                                maxTeamSize={data.maxTeamSize}
                                minTeamSize={data.minTeamSize}
                            /> : null
                        }
                        {
                            data.organizer ?
                                <OrganizerCard name={data.organizer.name} logo={data.organizer.logo} />
                                : null
                        }
                        <ContactCard
                            contacts={data.contacts}
                        />
                        <ShareCard
                            title={data.name}
                            link={`https://vidyut.amrita.edu/competition/${router.query.slug}`}
                        />
                    </div>
                </div>
            </div>
        ): null}
        <DashboardFooter/>
    </Base>
};


export default Workshop;