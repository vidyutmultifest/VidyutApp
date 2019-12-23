import React, {useEffect, useState} from "react";
import Base from "../../components/base";
import { useRouter } from 'next/router';
import dataFetch from "../../utils/dataFetch";
import Head from "next/head";
import TitleBar from "../../components/titleBar";
import EventHeaderCard from "../../components/events/headerCard";
import moment from "moment";

import '../../styles/events/style.sass';
import ShareCard from "../../components/events/shareCard";
import ContactCard from "../../modules/events/contactCard";
import DashboardFooter from "../../modules/dashboard/footer";
import classNames from "classnames";
import OrganizerCard from "../../modules/events/organizerCard";

const Workshop = () => {
    const router = useRouter();
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState();

    const [showMoreState, setShowMoreState] = useState(false);

    const query = `{
      getWorkshop(slug: "${router.query.slug}")
      {
        name
        slug
        cover
        details
        description
        department
        {
           name
        }
        organizer
        {
          name
          logo
        }
        fee
        productID
        products
        {
           productID
           name
           price
           isAvailable
           isOutsideOnly
           requireRegistration
           isAmritapurianOnly
           isFacultyOnly
           isSchoolOnly
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
        trainers
        {
          name
          about
          photo
        }
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
        if(!isQueried) {
            getDetails().then((response) => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.getWorkshop);
                    setLoaded(true);
                }
            })
        }

    });

    const eventDetails = () => data.details && data.details.length > 0 ? (
        <div id="event-details-card" className="card-shadow">
            <h3>Workshop Details</h3>
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

    const renderTrainerCards = () => (
        <div className="my-4">
            <h2 className="px-4 mt-4 mb-2">Trainers</h2>
        {
            data.trainers ?
                <div className="row m-0">
                    {
                        data.trainers.map((trainer) => (
                            <div className="col-6 col-md-4 p-2">
                                <div className="card-shadow my-2">
                                    <img src={trainer.photo ? trainer.photo : null}/>
                                    <div className="p-4">
                                        <h4>{trainer.name}</h4>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>  : null
        }
        </div>
    );

    const renderSchedule = () => (
        <div className="card-shadow rounded my-4 p-4">
            <h4>Schedule</h4>
            {
                data.schedule.map((s,i) => (
                    <div className="py-3">
                        <div className="font-weight-bold">Day {i+1} - {moment(s.slot.startTime).format("DD/M")}</div>
                        <div>{moment(s.slot.startTime).format("h:mm a")} - {moment(s.slot.endTime).format("h:mm a")}</div>
                    </div>
                ))
            }
        </div>
    );

    return <Base>
        <Head>
            <title> { isLoaded ? data.name : router.query.slug } | Workshops | Vidyut 2020</title>
        </Head>
        <TitleBar />
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
                        {renderTrainerCards()}
                    </div>
                    <div className="col-md-5 col-xl-4 p-md-4 mb-4">
                        <OrganizerCard name={data.organizer.name} logo={data.organizer.logo} />
                        { renderSchedule() }
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
        <DashboardFooter />
    </Base>
};


export default Workshop;