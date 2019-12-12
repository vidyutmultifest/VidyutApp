import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";

import Card from "../../components/dashboard/Card";
import Base from "../../components/base";
import TitleBar from "../../components/titleBar";
import DashboardFooter from "../../modules/dashboard/footer";
import dataFetch from "../../utils/dataFetch";
import LoadingScreen from "../../components/loadingScreen";


const TeamViewPage = () => {
    const router = useRouter();

    const [isQueried, setQueried] = useState(false);
    const [teamData, setTeamData] = useState(false);
    const [myUsername, setMyUsername] = useState();
    const [isSaving, setSaving] = useState(false);
    const [leader, setLeader] = useState('');
    const [teamName, setTeamName] = useState('');
    const [removedMembers, addRemovedMembers] = useState([]);

    const query = `query getTeam($hash: String!){
      myProfile
      {
         username
      }
      getTeam(hash: $hash)
      {
        name
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

    const editMutation = `mutation editTeam($details:TeamEditDetailsObj!, $hash: String!)
    {
      editTeam(details:$details, teamHash: $hash)
      {
        status
      }
    }`;

    const getTeam = async variables => await dataFetch({ query, variables });
    const editTeam = async variables => await dataFetch({ query: editMutation, variables });


    useEffect(() => {
        if(!isQueried)
        {
            const hash = router.query.hash;
            if(hash !== undefined) {
                getTeam({hash}).then((response) => {
                    setQueried(true);
                    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                        setTeamData(response.data.getTeam);
                        if(response.data.getTeam !== null)
                        {
                            setLeader(response.data.getTeam.leader.username);
                            setTeamName(response.data.getTeam.name);
                        }
                        setMyUsername(response.data.myProfile.username);
                    }
                })
            }
        }
    });

    const handleEditTeam = () => {
        setSaving(true);
        const details = { name: teamName, removeMembers: removedMembers, leader };
        editTeam({ details, hash: router.query.hash}).then((response) =>{
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                setSaving(false);
                router.reload();
            }
        });
    };

    const renderMemberCard = (m,i) => (
        <div className="list-group-item">
            <h5 className="mb-0">{i}. {m.name}</h5>
            {
                m.username !== myUsername && teamData.isUserLeader && m.username !== leader ?
                    <button className="btn btn-danger mt-2 rounded-0" style={{ fontSize: "0.8rem" }} onClick={() =>
                        addRemovedMembers([...removedMembers, m.username])
                    }>
                        Remove Member
                    </button> : null
            }
        </div>
    );

    const exitTeam = () =>
    {
        setSaving(true);
        const details = { removeMembers: [myUsername] };
        editTeam({ details, hash: router.query.hash}).then((response) =>{
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                setSaving(false);
                router.replace('/my-teams');
            }
        });
    };

    return   isSaving ? <LoadingScreen text="Saving your changes" /> : teamData ? <Base loginRequired>
        <Head>
            <title> {teamName} | Edit Team | Vidyut 2020 </title>
        </Head>
        <TitleBar />
        <div className="container">
            <Card
                title={`Your Team: ${teamName}`}
                content={
                    <div className="p-4">
                        <div className="form-group">
                            <label htmlFor="team-name-input">Team Name</label>
                            <input
                                id="team-name-input"
                                name="team-name-input"
                                className="form-control"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                disabled={!teamData.isUserLeader}
                                placeholder="Enter Team Name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="teamLeader-select">Leader</label>
                            <select
                                name="teamLeader-select"
                                id="teamLeader-select"
                                className="form-control"
                                disabled={!teamData.isUserLeader}
                                onChange={(e) => setLeader(e.target.value)}
                                value={leader}
                            >
                                {
                                    teamData.members.map(m =>  !removedMembers.includes(m.username) ? (
                                        <option value={m.username}>{m.name}</option>
                                    ) : null )
                                }
                            </select>
                        </div>
                        <div>
                            <label>Team Members</label>
                            <ul className="list-group">
                                { teamData.members.map((m,i) => !removedMembers.includes(m.username) ? renderMemberCard(m,i+1) : null) }
                            </ul>
                        </div>
                    </div>
                }
                footer={
                    !teamData.isUserLeader ?
                        <button className="btn btn-primary" onClick={exitTeam}>Leave Team</button> :
                    <button onClick={handleEditTeam} className="btn btn-primary">Save</button>
                }
            />
        </div>
        <DashboardFooter/>
    </Base> : teamData === null ? <LoadingScreen text="Access Denied" /> : <LoadingScreen text="Loading Team Profile" />;
};

export default TeamViewPage;
