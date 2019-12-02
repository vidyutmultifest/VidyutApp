import React, {useEffect, useState} from 'react'
import Base from "../components/base";
import dataFetch from "../utils/dataFetch";
import Head from "next/head";

import '../styles/events/style.sass';
import '../styles/bootstrap.sass';
import EventCard from "../components/events/card";
import TitleBar from "../components/titleBar";

const Shows = () => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);

    const query = `{
      listMerchandise
      {
        name
        cover
        description
        fee
        slug
        isRecommended
        isNew
        productID
      }
    }`;

    const getMerchandiseList = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried) {
            getMerchandiseList().then((response) =>{
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.listMerchandise);
                    setLoaded(true);
                }
            })
        }
    });

    const renderMerchandiseCard = (w) => (
        <div className="col-md-4 p-2">
            <EventCard
                name={w.name}
                text={w.description}
                cover={w.cover}
                price={w.fee}
                isNew={w.isNew}
                isRecommended={w.isRecommended}
                registerURL={`/purchase?product=${w.productID}`}
                registerText="Buy Now"
            />
        </div>
    );

    return <Base>
        <Head>
            <title>Shows | Vidyut 2020</title>
        </Head>
        <TitleBar />
        <div className="row m-0">
            <div className="col-lg-3">
            </div>
            <div id="event-listing" className="col-lg-9">
                <h3>Selling {data.length} Merchandise</h3>
                <div className="row m-0">
                    {
                        isLoaded ?
                            data.map(s => renderMerchandiseCard(s))
                            : null
                    }
                </div>
            </div>
        </div>
    </Base>
};

export default Shows
