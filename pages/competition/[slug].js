import React, {useEffect, useState} from "react";
import Base from "../../components/base";
import { useRouter } from 'next/router';
import dataFetch from "../../utils/dataFetch";
import Head from "next/head";
import TitleBar from "../../components/titleBar";
import EventHeaderCard from "../../components/events/headerCard";
import ShareCard from "../../components/events/shareCard";

import '../../styles/events/style.sass';
import PrizesCard from "../../modules/events/prizesCard";
import PurchasedItem from "../../components/dashboard/purchasedItem";
import PurchasesItems from "../../modules/events/PurchaseItems";

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
        products
        {
           productID
        }
        firstPrize
        secondPrize
        thirdPrize
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
            <title> { isLoaded ? data.name : router.query.slug } - Competition | Vidyut 2020 </title>
        </Head>
        <TitleBar />
        { isLoaded ? (
            <React.Fragment>
                <EventHeaderCard
                    cover={data.cover}
                    name={data.name}
                    price={data.fee}
                    text={data.description}
                    registerURL={`/purchase?product=${data.productID}`}
                />
                <div className="row m-0">
                    <div className="col-md-7 col-xl-9 p-md-4 my-4">
                        {eventDetails()}
                    </div>
                    <div className="col-md-5 col-xl-3 p-md-4 my-4">
                        <PurchasesItems products={data.products} />
                        <PrizesCard
                            firstPrize={data.firstPrize}
                            secondPrize={data.secondPrize}
                            thirdPrize={data.thirdPrize}
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