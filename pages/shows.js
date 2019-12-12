import React, {useEffect, useState} from 'react'
import Base from "../components/base";
import dataFetch from "../utils/dataFetch";
import Head from "next/head";

import '../styles/events/style.sass';
import '../styles/bootstrap.sass';
import EventCard from "../components/events/card";
import TitleBar from "../components/titleBar";
import StatusContainer from "../components/StatusContainer";

const Shows = () => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);

    const query = `{
      listTicketEvents
      {
        name
        cover
        description
        fee
        slug
        productID
        isNew
        isRecommended
      }
    }`;

    const getShowList = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried) {
            getShowList().then((response) =>{
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.listTicketEvents);
                    setLoaded(true);
                }
            })
        }
    });

    const renderShowCard = (w) => (
        <div className="col-md-4 p-2">
            <EventCard
                name={w.name}
                text={w.description}
                cover={w.cover}
                price={w.fee}
                isNew={w.isNew}
                isRecommended={w.isRecommended}
                registerURL={`/purchase?product=${w.productID}&promocode=EARLYBIRD`}
                registerText="Buy Now"
            />
        </div>
    );

    return <Base>
        <Head>
            <title>Shows | Vidyut 2020</title>
        </Head>
        <TitleBar />
        {
            isLoaded && data.length > 0 ?
                <div className="row m-0">
                    <div className="col-lg-3">
                    </div>
                    <div id="event-listing" className="col-lg-9">
                        <h3>Buy Passes for Shows at Vidyut 2020 ({data.length})</h3>
                        <div className="row m-0">
                            {
                                isLoaded ?
                                    data.reverse().map(s => renderShowCard(s))
                                    : null
                            }
                        </div>
                    </div>
                </div>
                : <div className="container d-flex align-items-center" style={{ minHeight: '90vh' }}>
                    <StatusContainer
                        title="No Shows Listed"
                        image={require('../images/illus/cleanup.png')}
                        text="We have not listed any shows for Vidyut 2020 at this moment, do check back later."
                    />
                </div>
        }

    </Base>
};

export default Shows
