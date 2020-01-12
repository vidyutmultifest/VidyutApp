import React, {useState} from "react";
import EventCard from "./card";
import HorizontalSlider from "../HorizontalSlider";

const CategoryEventLister = ({ name, slug, competitions, profileData, isOpen }) => {
    const [show, setOpen] = useState(isOpen ? isOpen : false);

    const renderCompetitionCard = (c) => (
            <EventCard
                alwaysShowCover
                name={c.name}
                cover={c.cover}
                price={c.fee}
                isNew={c.isNew}
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

    return competitions && competitions.length > 0 ?
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
                show ? <HorizontalSlider items={competitions.map(c => renderCompetitionCard(c))}/>: null
            }
        </div>
    ) : null

};

export default CategoryEventLister;