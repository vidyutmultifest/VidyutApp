import React, {useEffect, useState} from 'react'
import Base from "../components/base";
import dataFetch from "../utils/dataFetch";
import Head from "next/head";

import '../styles/events/style.sass';
import '../styles/bootstrap.sass';
import EventCard from "../components/events/card";
import TitleBar from "../components/titleBar";
import StatusContainer from "../components/StatusContainer";

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
        isNew
        isRecommended
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
                isNew={c.isNew}
                isRecommended={c.isRecommended}
                detailsURL={`/competition/${c.slug}`}
                registerText="Register Now"
            />
        </div>
    );

    return <Base>
        <Head>
            <title>Competitions | Vidyut 2020</title>
        </Head>
        <TitleBar />
        {
            isLoaded  && data.length > 0 ?
                <div className="row m-0">
                    <div className="col-lg-3">
                    </div>
                    <div id="event-listing" className="col-lg-9">
                        <div className="row m-0">
                            {
                                isLoaded ?
                                    data.map(c => renderCompetitionCard(c))
                                    : null
                            }
                        </div>
                    </div>
                </div>
                : <div className="container d-flex align-items-center" style={{ minHeight: '90vh' }}>
                    <StatusContainer
                        title="No Competitions Listed"
                        image={require('../images/illus/cleanup.png')}
                        text="We have not listed any competition for Vidyut 2020 at this moment, do check back later."
                    />
            </div>
        }
    </Base>
};

export default Competitions
