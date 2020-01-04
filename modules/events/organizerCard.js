import React from "react";

const OrganizerCard = ({ name, logo, title, icon }) => (
    <div className="organizer-card card-shadow p-4 rounded my-4">
        <h5>
            <img src={icon ? icon : require('../../images/icons/organization-icon.png')} style={{ width: "2rem" }} className="icon-img m-2" />
            { title ? title : 'Organized By' }
        </h5>
        <div className="name">{name}</div>
        <div className="text-center">
            { logo ? <img src={logo} /> : null }
        </div>
    </div>
);

export default OrganizerCard;