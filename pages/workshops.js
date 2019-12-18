import React, {useEffect, useState} from 'react'
import Base from "../components/base";
import dataFetch from "../utils/dataFetch";
import Head from "next/head";

import '../styles/events/style.sass';
import '../styles/bootstrap.sass';
import EventCard from "../components/events/card";
import TitleBar from "../components/titleBar";
import StatusContainer from "../components/StatusContainer";

const Workshops = () => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);

    const query = `{
      listWorkshops
      {
        name
        cover
        description
        fee
        slug
      }
    }`;

    const getWorkshopList = async () => await dataFetch({ query });

    useEffect(() => {
       if(!isQueried) {
           getWorkshopList().then((response) =>{
               setQueried(true);
               if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                   setData(response.data.listWorkshops);
                   setLoaded(true);
               }
           })
       }
    });

    const renderWorkshopCard = (w) => (
        <div className="col-md-4 p-2">
            <EventCard
                name={w.name}
                text={w.description}
                cover={w.cover}
                price={w.fee}
                isNew
                isRecommended
                detailsURL={`/workshop/${w.slug}`}
                registerText="Register Now"
            />
        </div>
    );

    return <Base>
        <Head>
            <title>Workshops | Vidyut 2020</title>
        </Head>
        <TitleBar />
        {
            isLoaded && data.length > 0 ? <div className="row m-0">
                <div className="col-lg-3">
                </div>
                <div id="event-listing" className="col-lg-9">
                    <h3>Conducting {data.length} Workshops</h3>
                    <div className="row m-0">
                        {
                            isLoaded ?
                                data.map(w => renderWorkshopCard(w))
                                : null
                        }
                    </div>
                </div>
            </div> : <div className="container d-flex justify-content-center  align-items-center" style={{ minHeight: '90vh' }}>
                    <StatusContainer
                        title="No Workshops Listed"
                        image={require('../images/illus/cleanup.png')}
                        text="We have not listed any workshops for Vidyut 2020 at this moment, do check back later."
                    />
            </div>
        }
    </Base>
};

export default Workshops
