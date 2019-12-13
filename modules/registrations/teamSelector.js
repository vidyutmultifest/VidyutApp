import React, {useEffect, useState} from "react";
import dataFetch from "../../utils/dataFetch";

const TeamSelector = ({ minTeamSize, maxTeamSize, onSelect, teamSelected }) => {

    const [myTeams, setMyTeams] = useState(false);
    const [selection, setSelection] = useState(teamSelected !== undefined ? teamSelected.hash : null);

    const myTeamsQuery = `{
      myTeams
      {
        name
        membersCount
        isUserLeader
        members
        {
            name
        }
        hash
      }
    }`;

    const getMyTeams = async () => await dataFetch({ query: myTeamsQuery });

    useEffect(() => {
        if(!myTeams)
        {
            getMyTeams().then( response => {
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setMyTeams(response.data.myTeams);
                }
            });
        }
    });

    const getSelectedTeam = (hash) => {
        return myTeams.filter(m => m.hash === hash)[0];
    };

    const renderTeamDetails = (team) => {
        return (
            <React.Fragment>
                <div className="card-shadow p-4">
                    <h4>{team.name} ({team.membersCount} Members)</h4>
                    <ol>
                        {
                            team.members.map(m => (
                                <li key={m.name}>{m.name}</li>
                            ))
                        }
                    </ol>
                </div>
                <div className=" mt-4 py-2">
                    {
                        team.membersCount >= minTeamSize && team.membersCount <= maxTeamSize ?
                            <button className="btn btn-primary px-4 py-2 font-weight-bold" onClick={() => onSelect(getSelectedTeam(selection))}>Proceed</button>
                            : team.membersCount < minTeamSize ?
                            <div className="alert alert-danger">
                                Your team {team.name} only has {team.membersCount} members, you need atleast {minTeamSize - team.membersCount} members more
                                to participate in this event. Invite others to join your team, or select a different team to continue registering.
                            </div> : team.membersCount > minTeamSize ?
                                <div className="alert alert-danger">
                                    Your team {team.name} has {team.membersCount} members, you need to remove atleast {team.membersCount - maxTeamSize} members
                                    to participate in this event. Go to your team page to remove members, or select a different team to continue registering.
                                </div> : null
                    }
                </div>

            </React.Fragment>
        )
    };

    const renderTeamSelector = () => (
        <div className="form-group">
            <label htmlFor="teamLeader-select">Select your team</label>
            <select
                name="teamLeader-select"
                id="teamLeader-select"
                className="form-control"
                onChange={(e) => setSelection(e.target.value)}
                defaultValue={ teamSelected ? teamSelected : "null"}
            >
                <option value="null" disabled>Choose a team</option>
                {
                    myTeams.map(m =>  m.isUserLeader ? (
                        <option key={m.hash} value={m.hash}>{m.name}</option>
                    ) : null )
                }
            </select>
        </div>
    );

    return (
        <div className="card-shadow p-4">
            <h3>1. Select your Team</h3>
            <p>
                Participating in this event requires you to form a team with <b>minimum of {minTeamSize} members</b>,
                and <b>maximum of {maxTeamSize} members</b>. You need to be leader of such a team to proceed with the registration.
            </p>
            {
                myTeams && myTeams.length > 0 ?
                    renderTeamSelector()
                    : myTeams.length == 0 ?
                    <div className="alert alert-danger">You don't seem to be in any team. Please create a team.</div>
                    : <div className="alert alert-warning">Loading your teams</div>
            }
            {
                myTeams && selection != null ? renderTeamDetails(getSelectedTeam(selection)) : null
            }
        </div>
    )

};

export default TeamSelector;