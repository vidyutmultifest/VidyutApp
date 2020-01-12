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
import CategoryEventLister from "../components/events/categoryEventLister";

const _ = require('lodash');


const Competitions = () => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);
    const [profileData, setProfileData] = useState(false);
    const [recommendedList, setRecommended] = useState(false);

    const [selected, setSelected] = useState(false);

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
      listRecommendedCompetitions
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
        firstPrize
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
      listByCategory
      {
        name
        slug
        competitions
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
            firstPrize
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
      }
    }`;

    const getCompetitionList = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried) {
            getCompetitionList().then((response) =>{
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.listByCategory);
                    setRecommended(response.data.listRecommendedCompetitions);
                    setProfileData(response.data.myProfile);
                    setLoaded(true);
                }
            })
        }
    });




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
                            <div className="category-filter container">
                                <h5 className="text-md-left text-center">Filter by Category</h5>
                                <div className="row m-0">
                                    <div className="col-6 col-md-4 col-lg-3 p-0">
                                        <button
                                            className="p-0"
                                            style={{ background: 'none', border: 'none', width: '100%' }}
                                            onClick={() => setSelected('recommended')}
                                        >
                                            <div className="p-4" style={{ background: '#311B92', minHeight: '5vh',  color: 'white'}}>
                                                <h6>Recommended Competitions</h6>
                                            </div>
                                        </button>
                                    </div>
                                    {
                                        data.map(c => (
                                            <div className="col-6 col-md-4 col-lg-3 p-0">
                                                <button
                                                    className="p-4 h-100 border-0 w-100 bg-none"
                                                    onClick={() => setSelected(c.slug)}
                                                    style={{ background: '#311B92', minHeight: '5vh',  color: 'white'}}
                                                >
                                                        <h6>{c.name}</h6>
                                                </button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div> : null
                    }
                    {
                        data.length > 0 ?
                            <div>
                                <div id="event-listing">
                                    {
                                        ("recommended" === selected || !selected) &&
                                        recommendedList && recommendedList.length > 0 ?
                                            <CategoryEventLister
                                                name="Recommended"
                                                slug="recommended"
                                                competitions={recommendedList}
                                                profileData={profileData}
                                                isOpen
                                            /> : null
                                    }
                                    {
                                        data.map(c =>
                                            c.slug === selected || !selected ? <CategoryEventLister
                                                name={c.name}
                                                slug={c.slug}
                                                isOpen
                                                competitions={c.competitions}
                                                profileData={profileData}
                                            /> : null
                                        )
                                    }
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
