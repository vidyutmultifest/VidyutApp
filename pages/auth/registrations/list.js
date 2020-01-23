import React, {useEffect, useState} from "react";
import Head from "next/head";
import { CSVLink } from "react-csv";

import Base from "../../../components/base";
import AdminRequired from "../../../components/adminRequired";
import dataFetch from "../../../utils/dataFetch";
import ContentCard from "../../../components/events/contentCard";
import {useRouter} from "next/router";
import RegProfileCard from "../../../components/admin/RegProfileCard";
import TeamProfileCard from "../../../components/admin/TeamProfileCard";
import RegStatOverview from "../../../components/admin/RegStatOverview";
import Topbar from "../../../components/common/topbar";
import MenuBar from "../../../components/common/menubar";
import BottomBar from "../../../components/common/bottombar";
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
            allowEditing
            hash
            leader
            {
              firstName
              lastName
              phone
              email
              vidyutID
              college
              {
                name
              }
            }
            members
            {
              firstName
              lastName
              vidyutID
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
            vidyutID
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

    const getCSV = (r) => {
      const list = [];
      r.map(r => {
          list.push({
              name: r.userProfile ? r.userProfile.firstName + ' ' + r.userProfile.lastName : r.teamProfile.name,
              college: r.userProfile ? r.userProfile.college ? r.userProfile.college.name : null : r.teamProfile.leader.college ?  r.teamProfile.leader.college.name : null,
              email: r.userProfile ? r.userProfile.email : r.teamProfile.leader.email,
              phone: r.userProfile ? r.userProfile.phone : r.teamProfile.leader.phone,
              vidyutID: r.userProfile ? r.userProfile.vidyutID : r.teamProfile.leader.VidyutID,
              regID: r.regID,
              timestamp: r.registrationTimestamp,
              transactionID: r.transaction ? r.transaction.transactionID : null,
              transactionAmount: r.transaction ? r.transaction.amount : null,
              transactionStatus: r.transaction ? r.transaction.isPaid ? 'Paid' : r.transaction.isProcessed ? 'Not Paid' : 'Unprocessed' : 'Not Attempted'
          })
      });
      return list;
    };

    const renderCard = (c) => c.registrations.length > 0 ? (
        <div className="pt-4">
            <ContentCard
                title={
                    <div className="d-inline">
                        <h5 className="d-inline">{c.name}</h5>
                        <div className="mt-2">
                            <div className="badge badge-success" style={{ fontSize: '1rem' }}>{c.count.paid}</div>
                            <div className="badge badge-danger ml-2" style={{ fontSize: '1rem' }}>{c.count.paymentPending}</div>
                            <div className="badge badge-primary ml-2" style={{ fontSize: '1rem'}}>{c.count.paid - c.count.amritapurianPaid}</div>
                            <div className="badge ml-2 text-light" style={{ fontSize: '1rem',  backgroundColor: '#a4123f' }}>{c.count.amritapurianPaid}</div>
                        </div>
                    </div>
                   }
                node={
                    <div>
                        <div className="mt-2">
                            <li><b>Total Registrations</b>: {c.count.total}</li>
                            <li><b>Paid Registrations</b>: {c.count.paid}</li>
                            <li><b>Registrations without Payment</b>: {c.count.paymentPending}</li>
                            <li><b>Outside Campus Paid</b>: {c.count.paid - c.count.amritapurianPaid}</li>
                            <li><b>Inside Campus Paid</b>: {c.count.amritapurianPaid}</li>
                        </div>
                        <CSVLink data={getCSV(c.registrations)} filename={`export_${c.name}_registration_data.csv`}>
                            <button className="btn btn-warning btn-shadow rounded-0 m-2">Download Data</button>
                        </CSVLink>
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
            <Topbar/>
            <MenuBar/>
            <div className="container px-0 py-4">
                { isLoaded && data ?
                    <div>
                        <div className="p-4">
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
                        </div>
                        <RegStatOverview />
                        <h4 className="px-4 my-4">Detailed List</h4>
                        <div className="row m-0">
                            <div className="col-md-3">
                                <div className="py-4" style={{position: 'sticky', top: '5rem'}}>
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
            <BottomBar
                currentTabIcon={require('../../../images/icons/feed-icon.png')}
                currentTabName="Stat"
            />
        </AdminRequired>
    </Base>
};

export default RegistrationList;