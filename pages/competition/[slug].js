import React, {useEffect, useState} from "react";
import Base from "../../components/base";
import { useRouter } from 'next/router';
import dataFetch from "../../utils/dataFetch";
import Head from "next/head";
import EventHeaderCard from "../../components/events/headerCard";
import ShareCard from "../../components/events/shareCard";

import '../../styles/events/style.sass';
import PrizesCard from "../../modules/events/prizesCard";

import ContactCard from "../../modules/events/contactCard";
import TeamSpecifierCard from "../../modules/events/teamSpecCard";
import OrganizerCard from "../../modules/events/organizerCard";
import ContentCard from "../../components/events/contentCard";
import ScheduleCard from "../../modules/events/scheduleCard";
import MenuBar from "../../components/common/menubar";
import Topbar from "../../components/common/topbar";
import BottomBar from "../../components/common/bottombar";

const Workshop = () => {
    const router = useRouter();
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState();

    const query = `{
      getCompetition(slug: "${router.query.slug}")
      {
        name
        slug
        cover
        details
        description
        rules
        judgingCriteria
        fee
        department
        {
           name
        }
        schedule
        {
          slot
          {
            startTime
            endTime
          }
          venue
          {
            name
            address
          }
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
        otherPrizes
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

    return <Base>
        <Head>
            <title> { isLoaded ? data.name : router.query.slug } - Competition | Vidyut 2020 | National Level Multifest - Amrita Vishwa Vidyapeetham, Amritapuri Campus</title>
        </Head>
        <Topbar/>
        <MenuBar
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
                    dept={data.department ? data.department.name : null}
                    text={data.description}
                    products={data.products}
                />
                <div className="row m-0">
                    <div className="col-md-7 col-xl-8 py-md-4 px-3 my-4">
                        {
                            data.isTeamEvent ? <TeamSpecifierCard
                                maxTeamSize={data.maxTeamSize}
                                minTeamSize={data.minTeamSize}
                            /> : null
                        }
                        <ContentCard
                            title="General Details"
                            content={data.details}
                            icon={require('../../images/icons/about-icon.png')}
                            classNames="mb-4"
                            isOpen
                        />
                        <ContentCard
                            title="Rules and Regulations"
                            content={data.rules}
                            icon={require('../../images/icons/rules-icon.png')}
                            classNames="mb-4"
                        />
                        <ContentCard
                            title="Judging Criteria"
                            content={data.judgingCriteria}
                            icon={require('../../images/icons/check-icon.png')}
                            classNames="mb-4"
                        />
                        <div className="card-shadow p-4 small-text mt-4">
                            <h6>Disclaimer</h6>
                            <div>
                                <div className="mb-2">
                                    The number of participants is limited in order to ensure an efficient realization
                                    of the events. Registrations are considered in the order of their payment.
                                    An early registration with successful payment is therefore recommended.
                                </div>
                                <div className="mb-2">
                                    The organizers reserve the right to cancel an event (inc. workshops / competitions)
                                    for organisational reasons (e.g. if the minimum number of participants is not achieved).
                                </div>
                                <div className="mb-2">
                                    We reserve the right to exclude any participant who have not done payment.
                                    Though you may prefer for on-spot payment, no slot is reserved against you until
                                    your payment is successful. We strictly allocate slots based on first-pay
                                    first serve basis.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 col-xl-4 py-md-4 mb-4">
                        <PrizesCard
                            firstPrize={data.firstPrize}
                            secondPrize={data.secondPrize ? data.secondPrize : null}
                            thirdPrize={data.thirdPrize ? data.thirdPrize : null}
                            otherPrizes={data.otherPrizes ? data.otherPrizes : null}
                        />
                        {
                            data.organizer ?
                                <OrganizerCard name={data.organizer.name} logo={data.organizer.logo} />
                                : null
                        }
                        {
                            data.schedule ?
                                <ScheduleCard
                                    schedule={data.schedule}
                                /> : null
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
        <BottomBar
            showDashboardIcon
        />
    </Base>
};


export default Workshop;