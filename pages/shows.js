import React from 'react'
import Base from "../components/base";
import dataFetch from "../utils/dataFetch";
import Head from "next/head";

import '../styles/events/style.sass';
import '../styles/bootstrap.sass';
import EventCard from "../components/events/card";
import TitleBar from "../components/titleBar";
import StatusContainer from "../components/StatusContainer";
import LoadingScreen from "../components/loadingScreen";
import DashboardFooter from "../modules/dashboard/footer";


const Shows = ({ data }) => {

    const renderShowCard = (w) => (
        <div className="col-md-4 p-2">
            <EventCard
                name={w.name}
                text={w.description}
                cover={w.cover}
                price={w.fee}
                isNew={w.isNew}
                isRecommended={w.isRecommended}
                detailsURL={`/show/${w.slug}`}
            />
        </div>
    );

    return <Base>
        <Head>
            <title>Shows | Vidyut 2020</title>
        </Head>
        {
            data ?
                <React.Fragment>
                    <TitleBar/>
                    {data.length > 0 ?
                        <div className="row m-0">
                            <div className="col-lg-3">
                            </div>
                            <div id="event-listing" className="col-lg-9">
                                <div className="row m-0">
                                    {
                                        data ?
                                            data.reverse().map(s => renderShowCard(s))
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                        : <div className="container d-flex justify-content-center  align-items-center"
                               style={{minHeight: '90vh'}}>
                            <StatusContainer
                                title="No Shows Listed"
                                image={require('../images/illus/cleanup.png')}
                                text="We have not listed any shows for Vidyut 2020 at this moment, do check back later."
                            />
                        </div>
                    }
                </React.Fragment>
                : <LoadingScreen text="Loading Shows"/>
        }
    <DashboardFooter />
    </Base>
};

Shows.getInitialProps = () => {
    const query = `{
      listTicketEvents
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

    return dataFetch({ query }).then(response => {
            if (!Object.prototype.hasOwnProperty.call(response, 'errors'))
                return { data: response.data.listTicketEvents };
            return { data: null }
        }
    )
};

export default Shows
