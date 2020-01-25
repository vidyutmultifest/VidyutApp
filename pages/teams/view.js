import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";

import Card from "../../components/dashboard/Card";
import Base from "../../components/base";
import TitleBar from "../../components/titleBar";
import DashboardFooter from "../../modules/dashboard/footer";
import dataFetch from "../../utils/dataFetch";
import LoadingScreen from "../../components/loadingScreen";
import {CopyToClipboard} from "react-copy-to-clipboard";
import { WhatsappShareButton } from 'react-share';
import fileUpload from "../../utils/fileUpload";
import Topbar from "../../components/common/topbar";
import MenuBar from "../../components/common/menubar";
import BottomBar from "../../components/common/bottombar";

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
        isEditable
        document
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

    const uploadFile = async data => await fileUpload(data);
    const [Document, setUploadFile] = useState(false);

    const handleEditTeam = () => {
        setSaving(true);

        const details = {
            name: teamName,
            removeMembers: removedMembers, leader
        };
        editTeam({ details, hash: router.query.hash}).then((response) =>{
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                if(Document.size)
                {
                    const data = new FormData();
                    data.append('document', Document);
                    const query = `mutation uploadDocument{
                      uploadDocument(teamHash: "${router.query.hash}" )
                      {
                        status
                      }
                    }`;
                    data.append('query', query);
                    uploadFile({data}).then((response) => {
                        setQueried(false);
                    });
                }
                setSaving(false);
            }
        });
    };


    const renderMemberCard = (m,i) => (
        <div className="list-group-item">
            <h5 className="mb-0">{i}. {m.name}</h5>
            {
                m.username !== myUsername && teamData.isUserLeader && m.username !== leader && teamData.isEditable ?
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


    return isSaving ? <LoadingScreen text="Saving your changes" /> : teamData ? <Base loginRequired>
        <Head>
            <title> {teamName} | Edit Team | Vidyut 2020 </title>
        </Head>
        <Topbar/>
        <MenuBar/>
        <div className="container p-0">
            <Card
                title={`Your Team: ${teamName}`}
                content={
                    <div className="p-4">
                        <div>Team Code:
                            <div className="mt-2">
                                <span className="p-2" style={{ background: "#ddd" }}>
                                    <span className="pr-2">{router.query.hash}</span>
                                    <CopyToClipboard text={router.query.hash}>
                                        <button className="plain-button">
                                            <img src={require('../../images/icons/copy-clipboard.png')} style={{ width: '20px'}} />
                                        </button>
                                    </CopyToClipboard>
                                </span>
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="team-name-input">Team Name</label>
                            <input
                                id="team-name-input"
                                name="team-name-input"
                                className="form-control"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                disabled={!teamData.isUserLeader || !teamData.isEditable}
                                placeholder="Enter Team Name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="teamLeader-select">Leader</label>
                            <select
                                name="teamLeader-select"
                                id="teamLeader-select"
                                className="form-control"
                                disabled={!teamData.isUserLeader || !teamData.isEditable}
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
                        <div className="form-group">
                            <label htmlFor="document-uploader">Upload Document / Attach File (Optional, if Applicable)</label>
                            <div>
                                {
                                    teamData.document ?
                                        <a href={teamData.document} className="btn btn-shadow rounded-0 btn-primary px-4 py-2">
                                            View Uploaded
                                        </a> : null
                                }
                                <div className="my-2">
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={(event) => setUploadFile(event.target.files[0])}
                                    />
                                </div>
                                {
                                    Document && Document.size > 2500000 ?
                                        <div className="alert alert-danger mt-4 p-2">
                                            Maximum File size for document is 2.5 Mb
                                        </div> : null
                                }
                            </div>
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
                    <div className="d-inline w-100">
                        {
                            teamData.isEditable && !(Document && Document.size > 2500000) ?
                                !teamData.isUserLeader ?
                                    <button className="btn btn-primary d-inline-block m-2" onClick={exitTeam}>Leave Team</button> :
                                    <button onClick={handleEditTeam} className="btn btn-primary d-inline-block m-2">Save</button>
                                : null
                        }
                        <WhatsappShareButton
                            className="d-inline-block"
                            url="https://vidyut.amrita.edu/teams/my-teams"
                        title={`Hey! Join my team - ${teamName} for Vidyut 2020, using the invite code \`\`\`${router.query.hash}\`\`\` through this link -`}
                        >
                            <button className="btn btn-warning d-inline-block m-2">Invite via WhatsApp</button>
                        </WhatsappShareButton>
                    </div>
                }
            />
        </div>
        <BottomBar
            currentTabIcon={require('../../images/icons/user-group-bottom-bar-icon.png')}
            currentTabName="Team"
        />
    </Base> : teamData === false ? <LoadingScreen
        title="Team Unreachable"
        text="This page either doesn't exist or you are forbidden from accessing it."
        showLinks
    /> : <LoadingScreen text="Loading Team Profile" />;
};

export default TeamViewPage;
