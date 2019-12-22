import React, {useEffect, useState} from "react";
import Base from "../../components/base";
import { useRouter } from 'next/router';
import dataFetch from "../../utils/dataFetch";
import Head from "next/head";
import TitleBar from "../../components/titleBar";
import EventHeaderCard from "../../components/events/headerCard";

import '../../styles/events/style.sass';
import ShareCard from "../../components/events/shareCard";
import ContactCard from "../../modules/events/contactCard";

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
        description
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

    const eventDetails = () => (
        <div id="event-details-card" className="card-shadow">
            <h3>Workshop Details</h3>
            <div dangerouslySetInnerHTML={{ __html: data.details}} />
        </div>
    );

    return <Base>
        <Head>
            <title> { isLoaded ? data.name : router.query.slug } | Workshops | Vidyut 2020</title>
        </Head>
        <TitleBar />
        { isLoaded ? (
            <React.Fragment>
                <EventHeaderCard
                    cover={data.cover}
                    name={data.name}
                    text={data.description}
                    products={data.products}
                />
                <div className="row m-0">
                    <div className="col-md-7 col-xl-9 p-md-4 p-0 my-4">
                        {eventDetails()}
                    </div>
                    <div className="col-md-5 col-xl-3 p-md-4 my-md-4">
                        <ContactCard
                            contacts={data.contacts}
                        />
                        <ShareCard
                            title={data.name}
                            link={`https://vidyut.amrita.edu/competition/${router.query.slug}`}
                        />
                    </div>
                </div>
            </React.Fragment>
        ): null}
    </Base>
};


export default Workshop;