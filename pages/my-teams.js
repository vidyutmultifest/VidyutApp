import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import Link from "next/link";

import Base from "../components/base";
import DashboardFooter from "../modules/dashboard/footer";
import TitleBar from "../components/titleBar";
import Card from "../components/dashboard/Card";
import dataFetch from "../utils/dataFetch";
import LoadingScreen from "../components/loadingScreen";
import QuickListCard from "../components/dashboard/QuickListCard";


const MyTeamsPage = () => {
    const router = useRouter();
    const [isQueried, setQueried] = useState(false);
    const [myTeams, setMyTeams] = useState(false);
    const [teamName, setTeamName] = useState(false);
    const [teamHash, setTeamHash] = useState(false);
    const [isCreatingTeam, setCreatingTeam] = useState(false);

    const createTeamMutation = `mutation createTeam($name:String!){
      createTeam(name: $name)
      {
        hash
      }
    }`;

    const joinTeamMutation = `mutation createTeam($teamHash:String!){
      joinTeam(teamHash: $teamHash)
      {
        hash
      }
    }`;

    const myTeamsQuery = `{
      myTeams
      {
        name
        membersCount
        isUserLeader
        hash
      }
    }`;

    const getMyTeams = async () => await dataFetch({ query: myTeamsQuery });
    const createTeam = async variables => await dataFetch({ query: createTeamMutation, variables });
    const joinTeam = async variables => await dataFetch({ query: joinTeamMutation, variables });

    useEffect(() => {
       if(!isQueried)
       {
           getMyTeams().then((response) => {
               if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                   setQueried(true);
                   setMyTeams(response.data.myTeams);
               }
           });
       }
    });

    const handleCreateTeam = () => {
        setCreatingTeam(true);
        createTeam({ name: teamName }).then((response) =>{
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                const hash = response.data.createTeam.hash;
                router.push('/teams/view?hash=' + hash);
                setCreatingTeam(false);
            }
        });
    };

    const handleJoinTeam = () => {
        setCreatingTeam(true);
        joinTeam({teamHash}).then((response) =>{
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                const hash = response.data.joinTeam.hash;
                router.push('/teams/view?hash=' + hash);
                setCreatingTeam(false);
            }
        });
    };


    const renderOptions = (
        <div className="row m-0">
            <div className="col-md-6">
                <Card
                    title="Create a Team"
                    content={
                        <div className="px-4 py-2">
                            <div className="form-group">
                                <label htmlFor="team-name-input">Team Name</label>
                                <input
                                    id="team-name-input"
                                    name="team-name-input"
                                    className="form-control"
                                    placeholder="Enter Team Name"
                                    onChange={(e) => setTeamName(e.target.value)}
                                />
                            </div>
                        </div>
                    }
                    footer={
                        <button onClick={handleCreateTeam} className="btn btn-primary">Create Team</button>
                    }
                />
            </div>
            <div className="col-md-6">
                <Card
                    title="Join a Team"
                    content={
                        <div className="px-4 py-2">
                            <div className="form-group">
                                <label htmlFor="team-name-input">Team Code</label>
                                <input
                                    id="team-name-input"
                                    name="team-name-input"
                                    className="form-control"
                                    placeholder="Enter Team Code"
                                    onChange={(e) => setTeamHash(e.target.value)}
                                />
                            </div>
                        </div>
                    }
                    footer={<button onClick={handleJoinTeam} className="btn btn-primary">Join Team</button>}
                />
            </div>
        </div>
    );

    const renderMyTeams = () => (
        <div className="p-2">
            <QuickListCard
                title="My Teams"
                items={myTeams.map(t => (
                    <Link href={`/teams/view?hash=${t.hash}`}>
                        <button className="btn w-100 card-shadow d-block text-left p-3">
                            <h4>{t.name}</h4>
                            { t.isUserLeader ? <span className="badge badge-warning px-3 py-2 mr-2">Leader</span> : null}
                            <span className="badge badge-primary px-3 py-2">{t.membersCount} Member{t.membersCount > 1 ? 's' : null}</span>
                        </button></Link>
                ))}
            />
        </div>
    );

    return isCreatingTeam ? <LoadingScreen text="Creating your team" /> : <Base loginRequired>
        <Head>
            <title> My Teams | Vidyut 2020 </title>
        </Head>
        <TitleBar />
            <div className="container my-4">
                { isQueried && myTeams.length > 0 ? renderMyTeams() : null }
                { renderOptions }
            </div>
        <DashboardFooter/>
    </Base>
};
export default MyTeamsPage;