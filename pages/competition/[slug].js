import React, {useEffect, useState} from "react";
import Base from "../../components/base";
import { useRouter } from 'next/router';
import dataFetch from "../../utils/dataFetch";
import Head from "next/head";
import TitleBar from "../../components/titleBar";
import EventHeaderCard from "../../components/events/headerCard";

import '../../styles/events/style.sass';
import ShareCard from "../../components/events/shareCard";

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
        fee
        productID
      }
    }`;

    const getDetails = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried) {
            getDetails().then((response) => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.getCompetition);
                    setLoaded(true);
                }
            })
        }

    });

    const eventDetails = () => (
        <div id="event-details-card" className="card-shadow">
            <h3>Competition Details</h3>
            <div dangerouslySetInnerHTML={{ __html: data.details}} />
        </div>
    );

    return <Base>
        <Head>
            <title> { isLoaded ? data.name : router.query.slug } | Competition | Vidyut 2020</title>
        </Head>
        <TitleBar />
        { isLoaded ? (
            <div className="container p-0 my-4">
                <EventHeaderCard
                    cover={data.cover}
                    name={data.name}
                    price={data.fee}
                    text={data.description}
                    registerURL={`/purchase?product=${data.productID}`}
                />
                {eventDetails()}
                <ShareCard />
            </div>
        ): null}
    </Base>
};


export default Workshop;