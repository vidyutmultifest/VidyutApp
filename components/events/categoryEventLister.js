import React, {useState} from "react";
import EventCard from "./card";
import HorizontalSlider from "../HorizontalSlider";

const CategoryEventLister = ({ name, slug, competitions, shows, profileData, isOpen, deptFiltered, searchQuery }) => {
    const [show, setOpen] = useState(isOpen ? isOpen : false);

    const isInName = (name,query) => {
        const words = name.toLowerCase().split(" ");
        for(let i = 0; i<words.length; i++)
        {
            if(words[i].startsWith(query.toLowerCase()))
                return true;
        }
        return false

    };


    const renderCompetitionCard = (c) => (
            <EventCard
                alwaysShowCover
                name={c.name}
                cover={c.cover}
                price={c.fee}
                isNew={c.isNew}
                text={c.description}
                organizer={c.organizer ? c.organizer.label : null}
                isRecommended={c.isRecommended}
                isTeamEvent={c.isTeamEvent}
                isTotalRate={c.isTotalRate}
                detailsURL={`/competition/${c.slug}`}
                registerText="Register"
                products={c.products}
                profileData={profileData}
                firstPrize={c.firstPrize}
            />
    );


    const renderShowCard = (c) => (
        <EventCard
            alwaysShowCover
            name={c.name}
            cover={c.cover}
            price={c.fee}
            text={c.description}
            organizer={c.organizer ? c.organizer.label : null}
            isRecommended={c.isRecommended}
            isTotalRate={c.isTotalRate}
            registerText="Purchase"
            detailsURL={`/show/${c.slug}`}
            products={c.products}
            showReason
            profileData={profileData}
        />
    );

    const list = competitions && competitions.length > 0 ?
        competitions.filter(c =>
            (!deptFiltered || c.department.value === deptFiltered.value)
            &&  (!searchQuery || isInName(c.name, searchQuery) || isInName(c.department.label, searchQuery))
        ) :  shows && shows.length > 0 ?
            shows.filter(s =>
                (!searchQuery || isInName(s.name, searchQuery))
            )
        : [];

    const getItems = list.map(c =>
        competitions && competitions.length > 0 ? renderCompetitionCard(c)
        : shows && shows.length > 0 ? renderShowCard(c) : null
    );

    return getItems.length > 0 ?
    (
        <div className="my-4" id={`${slug}-listing`}>
            <button style={{ border: 'none', background: 'none' }}>
                <div className="mb-2 mx-2" onClick={() => setOpen(!show)}>
                    <h5 style={{ fontSize: 'calc(1rem + 0.8vw)'}}>
                        {
                            show ?
                                <img className="pr-4" style={{ width: "32px", marginRight: "1rem" }} src={require('../../images/icons/chevron-up.png')} className="icon-img" />
                                : <img className="pr-4" style={{ width: "32px", marginRight: "1rem" }}  src={require('../../images/icons/chevron-down.png')} className="icon-img" />
                        }
                        {name}
                    </h5>
                </div>
            </button>
            {
                show ? <HorizontalSlider items={getItems}/>: null
            }
        </div>
    ) : null

};

export default CategoryEventLister;