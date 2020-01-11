import React, {useEffect, useState} from "react";
import Head from "next/head";

import Base from "../../../components/base";
import AdminRequired from "../../../components/adminRequired";
import TitleBar from "../../../components/titleBar";
import dataFetch from "../../../utils/dataFetch";
import ContentCard from "../../../components/events/contentCard";
import {useRouter} from "next/router";
import RegProfileCard from "../../../components/admin/RegProfileCard";
import TeamProfileCard from "../../../components/admin/TeamProfileCard";
import DashboardFooter from "../../../modules/dashboard/footer";

const RegistrationList = () => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);

    const [isPaidOnly, setPaidOnly] = useState();
    const [type, setType] = useState();

    const query = `query registrationLister($type: String, $paidOnly: Boolean)
    {
      listRegistrations(eventType: $type)
      {
        name
        count
        {
          total
          paid
          paymentPending
          amritapurianPaid
        }
        registrations(isPaid: $paidOnly)
        {
          regID
          formData
          registrationTimestamp
          teamProfile
          {
            name
            members
            {
              firstName
              lastName
            }
          }
          transaction { 
            isPaid
            isProcessed
            amount
            transactionID
          }
          userProfile
          {
            firstName
            lastName
            email
            isAmritapurian
            college { name }
          }
        }
      }
    }`;

    const getRegistrationList = async variables => await dataFetch({ query, variables });
    const router = useRouter();

    useEffect(() => {
        if(!isQueried)
        {
            const paidOnly = router.query.isPaid === '1' ? true : router.query.isPaid === '0' ? false : null;
            const type = router.query.type;
            getRegistrationList({
                paidOnly, type
            }).then((response) =>{
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.listRegistrations);
                    setLoaded(true)
                }
            })
        }
    });

    const renderCard = (c) => (
        <div className="pt-4">
            <ContentCard
                title={
                    <div className="d-inline">
                        <h5 className="d-inline">{c.name}</h5>
                        <div className="badge badge-success ml-2" style={{ fontSize: '1rem' }}>{c.count.paid}</div>
                        <div className="badge badge-danger ml-2" style={{ fontSize: '1rem' }}>{c.count.paymentPending}</div>
                        <div className="badge badge-primary ml-2" style={{ fontSize: '1rem'}}>{c.count.paid - c.count.amritapurianPaid}</div>
                        <div className="badge ml-2 text-light" style={{ fontSize: '1rem',  backgroundColor: '#a4123f' }}>{c.count.amritapurianPaid}</div>
                    </div>
                   }
                node={
                    <div className="mt-4">
                        <div>
                            <li><b>Total Registrations</b>: {c.count.total}</li>
                            <li><b>Paid Registrations</b>: {c.count.paid}</li>
                            <li><b>Registrations without Payment</b>: {c.count.paymentPending}</li>
                            <li><b>Outside Campus Paid</b>: {c.count.paid - c.count.amritapurianPaid}</li>
                            <li><b>Inside Campus Paid</b>: {c.count.amritapurianPaid}</li>
                        </div>
                        <div className="row mx-0 mt-4">
                        {
                            c.registrations.map((r) =>
                                 r.teamProfile ?
                                     <div className="col-12 p-2">
                                        <TeamProfileCard
                                            teamProfile={r.teamProfile}
                                            formData={r.formData}
                                            transaction={r.transaction}
                                            regID={r.regID}
                                            timestamp={r.registrationTimestamp}
                                        />
                                     </div> : r.userProfile ?
                                     <div className="col-md-6 col-12 p-2">
                                         <RegProfileCard
                                             profile={r.userProfile}
                                             formData={r.formData}
                                             transaction={r.transaction}
                                             regID={r.regID}
                                             timestamp={r.registrationTimestamp}
                                             showTransactionDetails
                                         />
                                     </div> : null
                            )
                        }
                        </div>
                    </div>
                }
            />
        </div>

    );

    return <Base loginRequired>
        <Head>
            <title>Registration List | Vidyut 2020 | National Level Multifest</title>
        </Head>
        <AdminRequired>
            <TitleBar />
            <div className="container px-0 py-4">
                { isLoaded && data ?
                    <div>
                        <h2>Registration List</h2>
                        <div className="card-shadow my-4 p-4">
                            <h4>Filter Options</h4>
                            {
                                isPaidOnly ?
                                    <button className="btn-shadow btn btn-primary m-2 p-2">Paid + Workshops</button>
                                    : null
                            }
                            <button className="btn-shadow btn btn-primary m-2 p-2">Unpaid + Workshops</button>
                            <button className="btn-shadow btn btn-primary m-2 p-2">Paid + Competitions</button>>
                            <button className="btn-shadow btn btn-primary m-2 p-2">Unpaid + Competitions</button>
                        </div>
                        <div>
                            Showing registrations recieved for
                            {
                                router.query.type === 'competition' ? <b> {data.length} competition{data.length > 1 ? 's' : ''} </b> :
                                    router.query.type === 'workshop' ? <b>  {data.length} workshop{data.length > 1 ? 's' : ''} </b> :
                                        null
                            }
                            that you have access to and which received registrations,
                            {
                                router.query.isPaid === '1' ? <React.Fragment> with details of <b>paid</b> transactions.</React.Fragment> :
                                    router.query.isPaid === '0' ? <React.Fragment> with details of <b>unpaid</b> transactions.</React.Fragment>
                                        :  <React.Fragment> with details of <b>all</b> transactions.</React.Fragment>
                            }
                        </div>
                        { data.map(c => renderCard(c)) }
                    </div>
                    : null }
            </div>
            <DashboardFooter />
        </AdminRequired>
    </Base>
};

export default RegistrationList;