import React, {useEffect, useState} from "react";
import Head from "next/head";

import dataFetch from "../../utils/dataFetch";
import Base from "../../components/base";
import TitleBar from "../../components/titleBar";
import DashboardFooter from "../../modules/dashboard/footer";
import StatusContainer from "../../components/StatusContainer";
import Link from "next/link";

const MyRegistrations = () => {
    const [isQueried, setQueried] = useState(false);
    const [data, setData] = useState(false);

    const query = `{
      myRegistrations
      {
        registrationTimestamp
        regID
        event
        {
           name
           price
           productID
        }
        team
        {
           name
           isUserLeader
           membersCount
        }
        order
        {
           orderID
           transaction
           {
              isPaid
              isPending
              isProcessed
              amount
           } 
        }
      }
    }`;

    const getRegs = async () => await dataFetch({query});


    useEffect(() => {
        if(!isQueried)
        {
            getRegs().then((response) => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.myRegistrations);
                }
            })
        }
    });

    const renderRegistration = (r) => (
        <div className="p-2">
            <div className="card-shadow rounded">
                <div className="row m-0">
                    <div className="col-md-9 p-2">
                        <h6>{r.event.name}</h6>
                        <span className="small-text">Reg#: {r.regID} | </span>
                    </div>
                    <div className="col-md-3 p-2">
                        <div className="d-flex align-items-center justify-content-end">
                            {
                                r.order == null ?
                                    <Link href={
                                        `/purchase?product=${r.event.productID}&qty=${r.team !== null ? r.team.membersCount : 1}&regID=${r.regID}`
                                    }>
                                        <button className="btn btn-primary">Pay {r.team !== null ? r.event.price * r.team.membersCount : r.event.price}</button>
                                    </Link>
                                    :  r.order.transaction && r.order.transaction.isPaid ? (
                                        <div className="text-right">
                                            <img src={require('../../images/icons/checked.png')} style={{ maxWidth: '32px'}} />
                                            <b>₹{r.order.transaction.amount}</b>
                                        </div>
                                    ) :
                                    r.order.transaction && r.order.transaction.isPending ?
                                        <img src={require('../../images/icons/cancel.png')} style={{ maxWidth: '32px'}} /> :
                                        <Link href={
                                            `/purchase?product=${r.event.productID}&qty=${r.team !== null ? r.team.membersCount : 1}&regID=${r.regID}`
                                        }>
                                            <button className="btn btn-primary">Retry Payment</button>
                                        </Link>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );

    return <Base loginRequired>
        <Head>
            <title>My Registrations | Registrations | Vidyut 2020</title>
        </Head>
        <TitleBar />
        {
            !data ?
                <StatusContainer
                    style={{ minHeight: '85vh' }}
                    animation={require('../../images/animations/radar')}
                />
                : data.length > 0 ?
                <div className="container p-0">
                    <h1 className="my-4">My Registrations</h1>
                    <div className="card-shadow bg-gradient p-4">{ data.map(r => renderRegistration(r)) }</div>
                </div> : <StatusContainer
                    title="No Registrations Found"
                    image={require('../../images/illus/sad.png')}
                    text="Looks like you have not registered for any events for Vidyut 2020"
                />
        }
        <DashboardFooter />
    </Base>
};

export  default MyRegistrations;