import React, {useEffect, useState} from "react";
import Card from "../../components/dashboard/Card";
import Base from "../../components/base";
import TitleBar from "../../components/titleBar";
import DashboardFooter from "../../modules/dashboard/footer";
import dataFetch from "../../utils/dataFetch";
import LoadingScreen from "../../components/loadingScreen";
import {useRouter} from "next/router";

const TeamViewPage = () => {
    const router = useRouter();

    const [isQueried, setQueried] = useState(false);
    const [teamData, setTeamData] = useState(false);

    const query = `query getTeam($hash: String!){
      getTeam(hash: $hash)
      {
        name
        collegeName
        leader
        {
          name
          username
        }
        members
        {
          name
          username
        }
        isUserLeader
      }
    }`;

    const getTeam = async variables => await dataFetch({ query, variables });


    useEffect(() => {
        if(!isQueried)
        {
            const hash = router.query.hash;
            if(hash !== undefined) {
                getTeam({hash}).then((response) => {
                    setQueried(true);
                    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                        setTeamData(response.data.getTeam);
                    }
                })
            }
        }
    });

    return  teamData ? <Base loginRequired>
        <TitleBar />
        <Card
            title={`Your Team: ${teamData.name}`}
            content={
                <div className="p-4">
                    <div className="form-group">
                        <label htmlFor="team-name-input">Team Name</label>
                        <input
                            id="team-name-input"
                            name="team-name-input"
                            className="form-control"
                            value={teamData.name}
                            placeholder="Enter Team Name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="teamLeader-select">Leader</label>
                        <select
                            name="teamLeader-select"
                            id="teamLeader-select"
                            className="form-control"
                            value={teamData.leader.username}
                        >
                            {
                                teamData.members.map(m => (
                                    <option value={m.username}>{m.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="team-name-input">College</label>
                        <input
                            id="team-name-input"
                            name="team-name-input"
                            className="form-control"
                            disabled
                            value={teamData.collegeName}
                            placeholder="Team Leader's College"
                        />
                    </div>
                    <div>
                        <label>Team Members</label>
                        <ol>
                            {
                                teamData.members.map(m => (
                                    <li className="py-2">{m.name}</li>
                                ))
                            }
                        </ol>
                    </div>
                </div>
            }
            footer={<button className="btn btn-primary">Save</button>}
        />
        <DashboardFooter/>
    </Base> : <LoadingScreen text="Loading Team Profile" />
};

export default TeamViewPage;
