import React from "react";

const OrganizerCard = ({ name, logo }) => (
    <div id="organizer-card" className="card-shadow p-4 my-4">
        <h4>Organized By</h4>
        <div className="name">{name}</div>
        <div className="text-center">
            { logo ? <img src={logo} /> : null }
        </div>
    </div>
);

export default OrganizerCard;