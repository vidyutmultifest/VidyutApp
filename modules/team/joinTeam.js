import React, {useState} from "react";
import Card from "../../components/dashboard/Card";
import dataFetch from "../../utils/dataFetch";
import {useRouter} from "next/router";

const JoinTeam = () => {
    const router = useRouter();
    const [teamHash, setTeamHash] = useState(false);
    const [isJoiningTeam, setJoiningTeam] = useState(false);

    const joinTeamMutation = `mutation joinTeam($teamHash:String!){
      joinTeam(teamHash: $teamHash)
      {
        hash
      }
    }`;

    const joinTeam = async variables => await dataFetch({ query: joinTeamMutation, variables });

    const [joinTeamError, setJoinTeamError] = useState();

    const handleJoinTeam = () => {
        setJoiningTeam(true);
        joinTeam({teamHash}).then((response) =>{
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                const hash = response.data.joinTeam.hash;
                router.push('/teams/view?hash=' + hash);
                setJoiningTeam(false);
            }
            else {
                setJoinTeamError(response.errors);
                setJoiningTeam(false);
            }
        });
    };

    return (
        <Card
            title="Join a Team"
            content={
                <div className="px-4 py-2">
                    {
                        joinTeamError ?
                            <div className="alert alert-danger p-2">
                                {joinTeamError[0].message}
                            </div> : null
                    }
                    <div className="form-group">
                        <label htmlFor="team-code-input">Team Code</label>
                        <input
                            id="team-code-input"
                            name="team-code-input"
                            className="form-control"
                            placeholder="Enter Team Code for Joining a Team"
                            onChange={(e) => setTeamHash(e.target.value)}
                        />
                    </div>
                </div>
            }
            footer={<button onClick={handleJoinTeam} className="btn btn-primary">Join Team</button>}
        />
    )

};

export default JoinTeam