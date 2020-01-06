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
import OrganizerCard from "../../modules/events/organizerCard";
import TrainerCards from "../../modules/events/TrainerCards";
import ContentCard from "../../components/events/contentCard";
import ScheduleCard from "../../modules/events/scheduleCard";

const Workshop = () => {
    const router = useRouter();
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState();

    const query = `{
      getWorkshop(slug: "${router.query.slug}")
      {
        name
        slug
        cover
        details
        certificate
        mediumOfInstruction
        eligibility
        syllabus
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
        partners
        {
          name
          logo
        }
        accreditedBy
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
           isGSTAccounted
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
        if(!isQueried && router.query.slug !== undefined) {
            getDetails().then((response) => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.getWorkshop);
                    setLoaded(true);
                }
            })
        }

    });


    const renderPartners = () => data.partners.length > 0 ? (
        <div className="card-shadow bg-gradient my-4 p-4">
            <h5>
                <img src={require('../../images/icons/heart-icon.png')} style={{ width: "2rem" }} className="icon-img m-2" />
                Knowledge Partners
            </h5>
            <div className="row m-0 pt-4">
                {
                    data.partners.map(s => (
                        <div className="col-md-6 p-2">
                            <div className="card-shadow p-3 h-100 d-flex justify-content-center text-center align-items-center">
                                <div>
                                    { s.logo ? <img src={s.logo} style={{ maxHeight: "150px"}} /> : null }
                                    <div className="font-weight-bold mt-4">{s.name}</div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    ) : null;


    return <Base>
        <Head>
            <title> { isLoaded ? data.name : router.query.slug } | Workshops | Vidyut 2020</title>
        </Head>
        <TitleBar
            breadcrumbs={[
                {
                    name: "Workshops",
                    link: '/workshops'
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
                    <div className="col-md-7 col-xl-8 py-md-4 px-3 my-4">
                        <ContentCard
                            title="General Details"
                            content={data.details}
                            icon={require('../../images/icons/about-icon.png')}
                            classNames="mb-4"
                            isOpen
                        />
                        <ContentCard
                            title="Syllabus"
                            content={data.syllabus}
                            icon={require('../../images/icons/syllabus-icon.png')}
                            classNames="mb-4"
                        />
                        <ContentCard
                            title="Eligibility"
                            content={data.eligibility}
                            icon={require('../../images/icons/checklist-icon.png')}
                            classNames="mb-4"
                        />
                        <ContentCard
                            title="Certification"
                            content={data.certificate}
                            icon={require('../../images/icons/certificate-icon.png')}
                            classNames="mb-4"
                        />
                        <ContentCard
                            title="Medium of Instruction"
                            content={data.mediumOfInstruction}
                            icon={require('../../images/icons/languages-icon.png')}
                            classNames="mb-4"
                        />
                        {renderPartners()}
                        <TrainerCards trainers={data.trainers} />
                    </div>
                    <div className="col-md-5 col-xl-4 py-md-4 mb-4">
                        {
                            data.organizer ?
                                <OrganizerCard name={data.organizer.name} logo={data.organizer.logo} />
                                : null
                        }
                        {
                            data.accreditedBy ?
                                <OrganizerCard
                                    title="Accredited By"
                                    name={data.accreditedBy.name}
                                    logo={data.accreditedBy.logo}
                                    icon={require('../../images/icons/warranty-icon.png')}
                                />
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
        <DashboardFooter />
    </Base>
};


export default Workshop;