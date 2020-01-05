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
import ContentCard from "../components/events/contentCard";

const _ = require('lodash');


const Competitions = () => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);
    const [profileData, setProfileData] = useState(false);

    const [deptSel, setDept] = useState('');
    const [orgSel, setOrg] = useState('');
    const [sQuery, setSQuery] = useState('');

    const query = `{
      myProfile
      {
        isAmritian
        isAmritapurian
        isFaculty
        isSchoolStudent
        hasEventsRegistered
      }
      listCompetitions
      {
        name
        cover
        description
        fee
        slug
        isNew
        isRecommended
        isTotalRate
        isTeamEvent
        products
        {
           productID
           name
           price
           isAvailable
           isOutsideOnly
           requireRegistration
           isGSTAccounted
           isAmritapurianOnly
           isFacultyOnly
           isSchoolOnly  
        }
        organizer
        {
          label: name
          value: id
        }
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
                    setProfileData(response.data.myProfile);
                    setLoaded(true);
                }
            })
        }
    });

    const renderCompetitionCard = (c) => (
        <div className="col-lg-4 col-md-6 p-2">
            <EventCard
                name={c.name}
                text={c.description}
                cover={c.cover}
                price={c.fee}
                isNew={c.isNew}
                dept={deptSel === '' || deptSel == null ? c.department.label : null}
                organizer={c.organizer ? c.organizer.label : null}
                isRecommended={c.isRecommended}
                isTeamEvent={c.isTeamEvent}
                isTotalRate={c.isTotalRate}
                detailsURL={`/competition/${c.slug}`}
                registerText="Register"
                products={c.products}
                profileData={profileData}
            />
        </div>
    );


    const renderFilters = () => (
        <div>
            <div className="p-2">
                <ContentCard
                    title="Search"
                    isOpen
                    classNames="bg-gradient p-2"
                    node={<input
                        className="form-control mt-3 rounded-0 border-0"
                        onChange={(e) => setSQuery(e.target.value)}
                        placeholder="Search by name / dept "
                    />}
                />
            </div>
            <div className="p-2">
                <DepartmentSelector onSelect={(e) => setDept(e)} />
            </div>
        </div>
    );

    const isInName = (name,query) => {
        const words = name.toLowerCase().split(" ");
        for(let i = 0; i<words.length; i++)
        {
            if(words[i].startsWith(query.toLowerCase()))
                return true;
        }
        return false

    };

    const renderCompetitions = () => {
        const filtered = data.map(c => {
            let flag = 0;
            if(sQuery != '' && !isInName(c.name,sQuery) && !isInName(c.department.label, sQuery))
                flag = 1;
            if(deptSel != '' && deptSel != null && deptSel.value !== c.department.value)
                flag = 1;
            if(orgSel !== '' && orgSel != null && c.organizer && orgSel.value !== c.organizer.value)
                flag = 1;
            if(orgSel !== '' && orgSel != null && !c.organizer)
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
                    <TitleBar
                        breadcrumbs={[
                            {
                                name: "Competitions",
                                link: '/competitions',
                                active: true
                            },
                        ]}
                    />
                    {
                        data.length > 0 ?
                            <div>
                                <div id="event-listing">
                                    <div className="row m-0">
                                        <div className="col-lg-3 col-md-4 px-0">
                                            <div className="d-none d-md-block filter-sidebar">
                                                {renderFilters()}
                                            </div>
                                            <div className="d-block d-md-none">
                                                {renderFilters()}
                                            </div>
                                        </div>
                                        <div className="col-lg-9 col-md-8 px-2 py-4">
                                            <div className="row m-0">
                                                { isLoaded ? renderCompetitions() : null }
                                            </div>
                                        </div>
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
                <DashboardFooter />
                </React.Fragment> : <LoadingScreen text="Loading Competitions" />
        }
    </Base>
};

export default Competitions
