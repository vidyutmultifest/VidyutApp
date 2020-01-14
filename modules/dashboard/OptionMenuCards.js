import React from "react";
import Link from "next/link";
const shortid = require('shortid');


const OptionMenuCards = ({ status }) => {

    const renderCard = (card) => (
        <div key={shortid.generate()} className="col-md-3 col-6 py-1 px-0">
            <div className="option-menu-card card-shadow h-100 p-2">
                <Link href={card.link}>
                    <a>
                        <img
                            src={card.icon}
                            alt={`An icon representing ${card.title}`}
                        />
                        <h4>{card.title}</h4>
                    </a>
                </Link>
            </div>
        </div>
    );

    const cardObjs = [
        {
            title: "My Profile",
            link: "/profile/edit-profile",
            icon: require('../../images/icons/profile.png'),
        },
        {
            title: "My Event Registrations",
            link: "/registrations/my-registrations",
            icon: require('../../images/icons/check-list.png'),
        },
        {
            title: "My Teams",
            link: "/teams/my-teams",
            icon: require('../../images/icons/user-group.png'),
        },
        {
            title: "My Schedule",
            link: "/my-schedule",
            icon: require('../../images/icons/calendar.png'),
        },
    ];

    return (<div className="row m-0 px-4">
        { cardObjs.map( i => renderCard(i)) }
    </div>)
};

export default OptionMenuCards;