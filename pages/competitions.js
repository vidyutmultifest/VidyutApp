import React, {useEffect, useState} from 'react'
import Base from "../components/base";
import dataFetch from "../utils/dataFetch";
import Head from "next/head";

import '../styles/events/style.sass';
import EventCard from "../components/events/card";
import TitleBar from "../components/titleBar";

const Competitions = () => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);

    const query = `{
      listCompetitions
      {
        name
        cover
        description
        fee
        slug
        productID
      }
    }`;

    const getCompetitionList = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried) {
            getCompetitionList().then((response) =>{
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.listCompetitions);
                    setLoaded(true);
                }
            })
        }
    });

    const renderCompetitionCard = (c) => (
        <div className="col-md-4 p-2">
            <EventCard
                name={c.name}
                text={c.description}
                cover={c.cover}
                price={c.fee}
                isNew
                isRecommended
                detailsURL={`/competitions/${c.slug}`}
                registerURL={`/purchase?product=${c.productID}`}
            />
        </div>
    );

    return <Base>
        <Head>
            <title>Competitions | Vidyut 2020</title>
        </Head>
        <TitleBar />
        <div className="row m-0">
            <div className="col-lg-3">
                <h4>Filters</h4>
            </div>
            <div id="event-listing" className="col-lg-9">
                <h3>Organizing {data.length} Competitions</h3>
                <div className="row m-0">
                    {
                        isLoaded ?
                            data.map(c => renderCompetitionCard(c))
                            : null
                    }
                </div>
            </div>
        </div>
    </Base>
};

export default Competitions
