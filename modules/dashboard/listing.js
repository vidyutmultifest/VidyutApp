import React, {useEffect, useState} from "react";
const shortid = require('shortid');
import classNames from 'classnames';

import dataFetch from "../../utils/dataFetch";
import EventCard from "../../components/events/card"

import '../../styles/dashboard/listing.sass';
import DepartmentSelector from "../events/filters/departmentSelector";
import CategorySelector from "../events/filters/categorySelector";
import OrganizerSelector from "../events/filters/organizerSelector";

const DashboardListing = () => {
    const [type, setType] = useState('competition');

    const query = `
    {
      myProfile
      {
        isAmritian
        isAmritapurian
        isFaculty
        isSchoolStudent
        hasEventsRegistered
      }
      listWorkshops
      {
        name
        cover
        description
        fee
        slug
        isRecommended
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
        isNew
        accreditedBy
        {
          name
        }
        department
        {
          label: name
          value: slug
        }
      }
      listTicketEvents
      {
        name
        cover
        description
        fee
        slug
        isRecommended
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
        isNew
      }
       listCompetitions
      {
        name
        cover
        description
        fee
        slug
        isRecommended
        KTUActivityPoints
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
        category
        {
          label: name
          value: slug
        }
        organizer
        {
          label: name
          value: id
        }
        isNew
        firstPrize
        department
        {
          label: name
          value: slug
        }
      }
    }`;

    const getListing = async () => await dataFetch({ query });

    const [isQueried, setQueried] = useState(false);
    const [workshops, setWorkshops] = useState(false);
    const [competitions, setCompetitions] = useState(false);
    const [shows, setShows] = useState(false);
    const [profileData, setProfileData] = useState(false);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        if(!isQueried) {
            getListing().then((response) =>{
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setWorkshops(response.data.listWorkshops);
                    setCompetitions(response.data.listCompetitions);
                    setShows(response.data.listTicketEvents);
                    setProfileData(response.data.myProfile);
                    setLoaded(true);
                }
            })
        }
    });

    const isInName = (name,query) => {
        const words = name.toLowerCase().split(" ");
        if(words.length > 1)
            for(let i = 0; i<words.length; i++)
                if(words[i].startsWith(query.toLowerCase()))
                    return true;
        return name.toLowerCase().startsWith(query.toLowerCase());
    };

    const [sQuery, setSQuery] = useState('');

    const getFilteredList = (list, type) => {
        return list.filter(i => {
            let flag = 0;
            if(sQuery === '' && !category && !dept && !organizer)
                return i;
            if(dept && i.department.value !== dept)
                flag = 1;
            if(type === 'competition')
                if(category && i.category && i.category.value !== category)
                    flag = 1;
            if(organizer && ( i.organizer === null || i.organizer.value !== organizer))
                flag = 1;
            if(sQuery !== '' && flag === 0)
            {
                if(isInName(i.name, sQuery))
                    flag = 0;
                else
                    flag = 1;
            }
            if(flag === 0) return i;
        })
    };

    const [category, setCat] = useState(false);
    const [dept, setDept] = useState(false);
    const [organizer, setOrg] = useState(false);
    const [showSearchBar, setShowSearchbar] = useState(false);
    const [showFooterFilter, setShowFooterFilter] = useState(false);

    const renderFilters = () => (
      <div>
          <div className={type !== 'competition' ? 'd-none' : null}>
              <CategorySelector
                onSelect={(e) => { setCat(e); setShowFooterFilter(false);}}
              />
          </div>
          <div className={type === 'show' ? 'd-none' : null}>
              <DepartmentSelector
                  onSelect={(e) => {setDept(e); setShowFooterFilter(false);}}
              />
          </div>
          <div className={type === 'show' ? 'd-none' : null}>
            <OrganizerSelector
                onSelect={(e) => {setOrg(e); setShowFooterFilter(false);}}
            />
          </div>
      </div>
    );

    const renderSearchbox = () => (
        <input
            className="form-control"
            id="search-button"
            value={sQuery}
            onChange={(e) => setSQuery(e.target.value)}
            placeholder="Search by name / dept "
        />
    );


    const renderListingTopBar = () => (
        <div className="listing-type-selector">
            <button
                onClick={() => setType('competition')}
                className={type === 'competition' ? 'selected' : null}
            >
                Competitions
            </button>
            <button
                onClick={() => setType('workshop')}
                className={type === 'workshop' ? 'selected' : null}
            >
                Workshops
            </button>
            <button
                onClick={() => setType('show')}
                className={type === 'show' ? 'selected' : null}
            >
                Shows
            </button>
            <div className="d-md-none d-inline text-right mobile-search-options">
                <button
                    onClick={() => setShowSearchbar(!showSearchBar)}
                    className="listing-mobile-filter-button"
                >
                    <img
                        src={require('../../images/icons/search-icon.png')}
                        alt="search button"
                    />
                </button>
                <button
                    onClick={() => setShowFooterFilter(!showFooterFilter)}
                    className="listing-mobile-search-button"
                >
                    <img
                        src={require('../../images/icons/filter-icon.png')}
                        alt="filter button"
                    />
                </button>
                <div className={classNames('footer-filter', !showFooterFilter ? 'd-none' : null)}>
                    <div
                        className={
                            classNames('footer-filter-container', !showFooterFilter ? 'd-none' : null)
                        }
                    >
                        {renderFilters()}
                    </div>
                </div>
            </div>
            {
                showSearchBar ?
                    <div className="topbar-search mt-2">
                        {renderSearchbox()}
                    </div> : null
            }
        </div>
    );
    console.log(type);

    return isLoaded ? (
      <div id="dashboard-listing">
          <div className="row m-0">
              <div className="col-lg-3 col-md-4">
                  <div className="desktop-filter-sidebar py-2">
                      <div className="d-none d-md-block">
                          <div className="my-4">
                              {renderSearchbox()}
                          </div>
                          <h4 className="mt-2">Filters</h4>
                          {renderFilters()}
                      </div>
                  </div>
              </div>
              <div className="col-lg-9 col-md-8 p-0">
                  {renderListingTopBar()}
                  {
                        type === 'workshop' ?
                            <div className="row m-0">
                                {
                                    getFilteredList(workshops, 'workshop').map(w =>
                                        <div key={shortid.generate()} className="col-lg-4 col-md-6 p-1">
                                            <EventCard
                                                name={w.name}
                                                text={w.description}
                                                cover={w.cover}
                                                price={w.fee}
                                                organizer={w.organizer ? w.organizer.label : null}
                                                isNew={w.isNew}
                                                dept={w.department ? w.department.label : null}
                                                isRecommended={w.isRecommended}
                                                detailsURL={`/workshop/${w.slug}`}
                                                products={w.products}
                                                profileData={profileData}
                                                KTUActivityPoints={w.KTUActivityPoints}
                                                accreditedBy={w.accreditedBy ? w.accreditedBy.name : null}
                                                alwaysShowCover
                                                listOnMobile
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        : type === 'competition' ?
                            <div className="row m-0">
                                {
                                    getFilteredList(competitions, 'competition').map(c =>
                                        <div key={shortid.generate()} className="col-lg-4 col-md-6 p-1">
                                            <EventCard
                                                name={c.name}
                                                text={c.description}
                                                cover={c.cover}
                                                price={c.fee}
                                                organizer={c.organizer ? c.organizer.label : null}
                                                isNew={c.isNew}
                                                dept={null}
                                                isRecommended={c.isRecommended}
                                                detailsURL={`/competition/${c.slug}`}
                                                products={c.products}
                                                profileData={profileData}
                                                KTUActivityPoints={c.KTUActivityPoints}
                                                firstPrize={c.firstPrize}
                                                isTotalRate={c.isTotalRate}
                                                isTeamEvent={c.isTeamEvent}
                                                alwaysShowCover
                                                listOnMobile
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        : type === 'show' ?
                                <div className="row m-0">
                                    {
                                        getFilteredList(shows, 'shows').map(c =>
                                            <div key={shortid.generate()} className="col-lg-4 col-md-6 p-1">
                                                <EventCard
                                                    name={c.name}
                                                    text={c.description}
                                                    cover={c.cover}
                                                    price={c.fee}
                                                    organizer={c.organizer ? c.organizer.label : null}
                                                    isNew={c.isNew}
                                                    dept={null}
                                                    isRecommended={c.isRecommended}
                                                    detailsURL={`/show/${c.slug}`}
                                                    products={c.products}
                                                    profileData={profileData}
                                                    firstPrize={c.firstPrize}
                                                    alwaysShowCover
                                                    listOnMobile
                                                />
                                            </div>
                                        )
                                    }
                                </div> : null
                  }
              </div>
          </div>
      </div>
    ) : null;

};

export default DashboardListing;
