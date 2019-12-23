import React from "react";

const OrganizerCard = ({ name, logo }) => (
    <div id="organizer-card" className="card-shadow p-4 my-4">
        <h4>Organized By</h4>
        <div className="name">{name}</div>
        { logo ? <img src={logo} /> : null }
    </div>
);

export default OrganizerCard;