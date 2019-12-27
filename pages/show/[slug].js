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
import DashboardFooter from "../../modules/dashboard/footer";
import classNames from "classnames";

const Show = ({ data }) => {
    const router = useRouter();
    const [showMoreState, setShowMoreState] = useState(false);

    const eventDetails = () => data.details && data.details.length > 0 ? (
        <div id="event-details-card" className="card-shadow">
            <h3>Show Details</h3>
            <div className={classNames('wrapper', showMoreState ? 'show-all' : null)}>
                <div dangerouslySetInnerHTML={{ __html: data.details}} />
            </div>
            {
                !showMoreState ?
                    <div className="show-more-hover mt-4 btn btn-primary px-4 py-2" onClick={() => setShowMoreState(true)}>Show More</div>
                    :  <div className="show-more-hover mt-4 btn btn-primary px-4 py-2" onClick={() => setShowMoreState(false)}>Show Less</div>

            }
        </div>
    ) : null;

    return <Base>
        <Head>
            <title> { data ? data.name : router.query.slug } | Workshops | Vidyut 2020</title>
        </Head>
        <TitleBar />
        { data ? (
            <div className="container p-0">
                <EventHeaderCard
                    cover={data.cover}
                    name={data.name}
                    text={data.description}
                    products={data.products}
                    registerText="Buy"
                />
                <div className="row m-0">
                    <div className="col-md-7 col-xl-8 p-md-4 p-0 my-4">
                        {eventDetails()}
                    </div>
                    <div className="col-md-5 col-xl-4 p-md-4 mb-4">
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
        <DashboardFooter/>
    </Base>
};

Show.getInitialProps = ({ query }) => {

    const gquery = `{
      getTicketEvent(slug: "${query.slug}")
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
           requireEventRegistration
           requireRegistration
           isOutsideOnly
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

    return dataFetch({ query: gquery }).then(response => {
            if (!Object.prototype.hasOwnProperty.call(response, 'errors'))
                return { data: response.data.getTicketEvent };
            return { data: null }
        }
    )
};

export default Show;