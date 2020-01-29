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

import '../../../styles/bootstrap.sass';
import RegDetails from "../../../components/admin/RegDetails";

const RegistrationList = () => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);

    const [isPaidOnly, setPaidOnly] = useState('any');
    const [type, setType] = useState('any');

    const query = `query registrationLister($type: String)
    {
        listRegistrations(eventType: $type)
        {
            id
            name
            count
            {
                total
                paid
                paymentPending
                amritapurianPaid
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


    const renderCard = (c) => (
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
                        <RegDetails id={c.id} />
                    </div>
                }
            />
        </div>

    );


    const sortedList = (r) => {
        return _.sortBy(r, [function(o) { return o.count.paid; }]);
    };


    return <Base loginRequired>
        <Head>
            <title>Registration List | Vidyut 2020 | National Level Multifest</title>
        </Head>
        <AdminRequired>
            <Topbar/>
            <MenuBar/>
            <div className="container px-0 py-4">
                <div>
                    <div className="p-4">
                        <h2>Registration List</h2>
                    </div>
                    <RegStatOverview />
                </div>
                { isLoaded && data ?
                    <div>
                        <h4 className="px-4 my-4">Detailed List</h4>
                        <div className="row m-0">
                            <div className="col-md-3">
                                <div className="py-4" style={{position: 'sticky', top: '5rem'}}>
                                    <h4>Filters</h4>
                                    <div className="form-group">
                                        <label htmlFor="shirtSize-select">Type</label>
                                        <select
                                            className="form-control"
                                            name="type-select"
                                            id="type-select"
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
                                { data ? sortedList(data).reverse().map(c => renderCard(c)) : null }
                            </div>
                        </div>
                    </div>
                    : <div className="my-4 card-shadow p-2">
                        <h3> Loading Detailed Stats </h3>
                        <p>Please wait upto 2 minutes for the detailed report to come up.</p>
                    </div> }
            </div>
            <BottomBar
                currentTabIcon={require('../../../images/icons/feed-icon.png')}
                currentTabName="Stat"
            />
        </AdminRequired>
    </Base>
};

export default RegistrationList;