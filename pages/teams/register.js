import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";

import Base from "../../components/base";
import DashboardFooter from "../../modules/dashboard/footer";
import TitleBar from "../../components/titleBar";
import Card from "../../components/dashboard/Card";
import Select from 'react-select';
import dataFetch from "../../utils/dataFetch";
import LoadingScreen from "../../components/loadingScreen";


const TeamRegistrationPage = () => {
    const router = useRouter();

    const [isQueried, setQueried] = useState(false);
    const [EventList, setEventList] = useState(false);
    const [teamName, setTeamName] = useState(false);
    const [teamHash, setTeamHash] = useState(false);
    const [event, setEvent] = useState(false);
    const [isCreatingTeam, setCreatingTeam] = useState(false);

    const listTeamCompetitionsQuery = `{
      listTeamCompetitions
      {
        label: name
        value: productID
      }
    }`;

    const createTeamMutation = `mutation createTeam($name:String!, $productID: String!){
      createTeam(name: $name, productID: $productID)
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

    const getTeamEvents = async () => await dataFetch({ query: listTeamCompetitionsQuery });
    const createTeam = async variables => await dataFetch({ query: createTeamMutation, variables });
    const joinTeam = async variables => await dataFetch({ query: joinTeamMutation, variables });


    useEffect(() => {
        if(!isQueried)
        {
            getTeamEvents().then((response) =>{
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setEventList(response.data.listTeamCompetitions);
                }
            })
        }
    });

    const handleCreateTeam = () => {
        const variables = {
            productID: event.value,
            name: teamName
        };
        setCreatingTeam(true);
        createTeam(variables).then((response) =>{
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                const hash = response.data.createTeam.hash;
                router.push('/teams/view?hash=' + hash);
                setCreatingTeam(false);
            }
        });
    };

    const handleJoinTeam = () => {
        const variables = {teamHash};
        setCreatingTeam(true);
        joinTeam(variables).then((response) =>{
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
                                <label htmlFor="team-name-input">Select Event</label>
                                {
                                    EventList ?
                                        <Select
                                            isSearchable
                                            options={EventList}
                                            value={event ? event : null}
                                            onChange={(newValue) => setEvent(newValue)}
                                        /> : null
                                }
                            </div>
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


    return isCreatingTeam ? <LoadingScreen text="Creating your team" /> : <Base loginRequired>
        <TitleBar />
            <div className="container my-4">
                <h1>Register as a Team</h1>
                { renderOptions }
            </div>
        <DashboardFooter/>
    </Base>
};
export default TeamRegistrationPage;