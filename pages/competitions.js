import React, {useEffect, useState} from 'react'
import Base from "../components/base";
import dataFetch from "../utils/dataFetch";
import Head from "next/head";
const shortid = require('shortid');

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
import classNames from "classnames";
import CategorySelector from "../modules/events/categorySelector";
import Slideshow from "../components/slideshow";

const _ = require('lodash');


const Competitions = () => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);
    const [profileData, setProfileData] = useState(false);
    const [recommendedList, setRecommended] = useState(false);

    const [selected, setSelected] = useState(false);

    const [deptSel, setDept] = useState(false);
    const [sQuery, setSQuery] = useState(false);

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
        KTUActivityPoints
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
            KTUActivityPoints
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

    const [showFilterScreen, setShowFilterScreen] = useState(false);

    const renderFooterFilters = () => (
        <div className="d-md-none d-block">
            <div id="footer-filter-screen" className={classNames(!showFilterScreen ? 'd-none' : null)}>
                <div className="p-2">
                    <CategorySelector
                        data={data}
                        onSelect={(e) => { setSelected(e.slug); setShowFilterScreen(false)}}
                    />
                </div>
                <div className="p-2">
                    <DepartmentSelector
                        onSelect={(e) => { setDept(e); setShowFilterScreen(false); }}
                    />
                </div>
            </div>
            <div id="footer-filter-bar">
                <div className="row m-0">
                    <div className="col-6">
                        <a href="#search-box"  onClick={() => setShowFilterScreen(false)} className="plain-link font-weight-bold text-dark">
                            <img src={require('../images/icons/search-icon.png')} style={{ width: '20px', margin: '5px' }} />
                            Search
                        </a>
                    </div>
                    <div className="col-6">
                        <button
                            className="plain-button font-weight-bold"
                            onClick={() => setShowFilterScreen(!showFilterScreen)}
                        >
                            <img src={require('../images/icons/filter-icon.png')} style={{ width: '20px', margin: '5px'  }} />
                            Filter
                        </button>
                    </div>
                </div>
            </div>
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
                        value={sQuery ? sQuery : null}
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
                        !deptSel && !sQuery ?
                            <div className="my-4">
                                <Slideshow feedSlug="competitions" />
                            </div> : null
                    }
                    <div className="d-block d-md-none px-2 pt-4" id="search-box">
                        <ContentCard
                            title="Search"
                            isOpen
                            classNames="bg-gradient p-2"
                            node={<input
                                className="form-control mt-3 rounded-0 border-0"
                                value={sQuery ? sQuery : null}
                                onChange={(e) => setSQuery(e.target.value)}
                                placeholder="Search by name / dept "
                            />}
                        />
                    </div>
                    {
                        data.length > 0 ?
                            <div>
                                <div id="event-listing">
                                    <div className="row m-0">
                                        <div className="col-lg-3 col-md-4 px-0">
                                            <div className="d-none d-md-block filter-sidebar">
                                                {renderFilters()}
                                            </div>
                                        </div>
                                        <div className="col-lg-9 col-md-8 px-2 py-4">
                                            <div id="event-listing">
                                                {
                                                    ("recommended" === selected || !selected) &&
                                                    recommendedList && recommendedList.length > 0 ?
                                                        <CategoryEventLister
                                                            name="Recommended"
                                                            slug="recommended"
                                                            searchQuery={sQuery}
                                                            deptFiltered={deptSel}
                                                            competitions={recommendedList}
                                                            profileData={profileData}
                                                            isOpen
                                                        /> : null
                                                }
                                                {
                                                    data.map(c =>
                                                        (c.slug === selected || !selected) ?
                                                        <CategoryEventLister
                                                            name={c.name}
                                                            slug={c.slug}
                                                            isOpen
                                                            searchQuery={sQuery}
                                                            deptFiltered={deptSel ? deptSel : false}
                                                            competitions={c.competitions}
                                                            profileData={profileData}
                                                            key={shortid.generate()}
                                                        /> : null
                                                    )
                                                }
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
                { renderFooterFilters() }
                </React.Fragment> : <LoadingScreen text="Loading Competitions" />
        }
    </Base>
};

export default Competitions
