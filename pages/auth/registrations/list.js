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
import RegStatOverview from "../../../components/admin/RegStatOverview";
const _ = require('lodash');

const RegistrationList = () => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);

    const [isPaidOnly, setPaidOnly] = useState('any');
    const [type, setType] = useState('any');

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
            phone
            isAmritapurian
            college { name }
          }
        }
      }
    }`;

    const getRegistrationList = async variables => await dataFetch({ query, variables });
    const router = useRouter();

    const getPaidStatus = () => {
        if(isPaidOnly==='1')
            return true;
        else if(isPaidOnly==='0')
            return false;
        else
            return null
    };

    useEffect(() => {
        if(!isQueried)
        {
            getRegistrationList({
                paidOnly: getPaidStatus(), type
            }).then((response) =>{
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.listRegistrations);
                    setLoaded(true)
                }
            })
        }
    });

    const renderCard = (c) => c.registrations.length > 0 ? (
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

    ) : null;

    const sortedList = () => {
        return _.sortBy(data, [function(o) { return o.registrations.length; }]);
    };

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
                        <div>
                            Showing registrations received for
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
                        <RegStatOverview />
                        <h4 className="my-4">Detailed List</h4>
                        <div className="row m-0">
                            <div className="col-md-3">
                                <div className="py-4">
                                    <h4>Filters</h4>
                                    <div className="form-group">
                                        <label htmlFor="shirtSize-select">Type</label>
                                        <select
                                            className="form-control"
                                            name="shirtSize-select"
                                            id="shirtSize-select"
                                            onChange={(e) => { setType(e.target.value); setQueried(false) }}
                                            value={type ? type : 'null'}
                                        >
                                            <option value="any"> All</option>
                                            <option value="competition">Competition</option>
                                            <option value="workshop">Workshop</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="shirtSize-select">Payment Status</label>
                                        <select
                                            className="form-control"
                                            name="shirtSize-select"
                                            id="shirtSize-select"
                                            onChange={(e) => { setPaidOnly(e.target.value); setQueried(false) }}
                                            value={isPaidOnly ? isPaidOnly : 'null'}
                                        >
                                            <option value="any"> All</option>
                                            <option value="1">Paid</option>
                                            <option value="0">Unpaid</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                { sortedList().reverse().map(c => renderCard(c)) }
                            </div>
                        </div>
                    </div>
                    : null }
            </div>
            <DashboardFooter />
        </AdminRequired>
    </Base>
};

export default RegistrationList;