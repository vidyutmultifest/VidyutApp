import React from "react";

const TeamSpecifierCard = ({ minTeamSize, maxTeamSize }) => (
    <div id="teamspec-card" className="card-shadow p-4 my-4">
        <h4>
            <img src={require('../../images/icons/user-group.png')} style={{ maxWidth: '45px'}} />
            Team Event
        </h4>
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