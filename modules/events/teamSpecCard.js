import React from "react";

const TeamSpecifierCard = ({ minTeamSize, maxTeamSize }) => (
    <div className="teamspec-card card-shadow rounded p-4 mb-4">
        <h5>
            <img src={require('../../images/icons/team-icon.png')} style={{ maxWidth: '2rem'}} className="icon-img m-2" />
            Team Event
        </h5>
        {
            minTeamSize !== maxTeamSize ? (
                <p>
                    A team with minimum of {minTeamSize} members
                    and maximum of {maxTeamSize} is required to
                    participate in this event.
                </p>
            ) : (
                <p>
                    A team of {minTeamSize} members is required to participate
                    in this event
                </p>
            )
        }

    </div>
);

export default TeamSpecifierCard;