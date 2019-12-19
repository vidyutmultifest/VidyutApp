import React, {useEffect, useState} from 'react'
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
import DepartmentSelector from "../modules/events/departmentSelector";

const _ = require('lodash');


const Competitions = () => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);

    const [deptSel, setDept] = useState('');
    const [sQuery, setSQuery] = useState('');

    const query = `{
      listCompetitions
      {
        name
        cover
        description
        fee
        slug
        isNew
        isRecommended
        isTeamEvent
        department
        {
          label: name
          value: slug
        }
      }
    }`;

    const getCompetitionList = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried) {
            getCompetitionList().then((response) =>{
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.listCompetitions);
                    setLoaded(true);
                }
            })
        }
    });

    const renderCompetitionCard = (c) => (
        <div className="col-md-4 p-2">
            <EventCard
                name={c.name}
                text={c.description}
                cover={c.cover}
                price={c.fee}
                isNew={c.isNew}
                isRecommended={c.isRecommended}
                isTeamEvent={c.isTeamEvent}
                detailsURL={`/competition/${c.slug}`}
                registerText="Register Now"
            />
        </div>
    );


    const renderFilters = () => (
        <div>
            <h4>Filters</h4>
            <div className="p-2">
                <h6>Search</h6>
                <input className="form-control" onChange={(e) => setSQuery(e.target.value)} />
            </div>
            <div className="p-2">
                <h6>Department</h6>
                <DepartmentSelector onSelect={(e) => setDept(e)} />
            </div>
        </div>
    );


    const renderCompetitions = () => {
        const filtered = data.map(c => {
            let flag = 0;
            if(sQuery != '' && !c.name.toLowerCase().startsWith(sQuery.toLowerCase()))
                flag = 1;
            if(deptSel != '' && deptSel != null && deptSel.value !== c.department.value)
                flag = 1;
            if(!flag) return c;
        });
        return filtered.map(c => c ? renderCompetitionCard(c) : null);
    };

    return <Base>
        <Head>
            <title>Competitions | Vidyut 2020</title>
        </Head>
        {
            isLoaded ?
                <React.Fragment>
                    <TitleBar />
                    {
                        data.length > 0 ?
                            <div className="row m-0">
                                <div className="col-xl-3 col-md-4 px-lg-4 px-md-2 py-4">
                                    {renderFilters()}
                                </div>
                                <div id="event-listing" className="col-xl-9 col-md-8">
                                    <div className="row m-0">
                                        { isLoaded ? renderCompetitions() : null }
                                    </div>
                                </div>
                            </div>
                            : <div className="container d-flex justify-content-center align-items-center"
                                   style={{minHeight: '90vh'}}>
                                <StatusContainer
                                    title="No Competitions Listed"
                                    image={require('../images/illus/cleanup.png')}
                                    text="We have not listed any competition for Vidyut 2020 at this moment, do check back later."
                                />
                            </div>
                    }
                    <DashboardFooter/>
                </React.Fragment> : <LoadingScreen text="Loading Competitions" />
        }
    </Base>
};

export default Competitions
