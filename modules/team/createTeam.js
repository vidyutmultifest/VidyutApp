import React, {useState} from "react";
import Card from "../../components/dashboard/Card";
import dataFetch from "../../utils/dataFetch";
import {useRouter} from "next/router";

const CreateTeam = () => {
    const router = useRouter();
    const [isCreatingTeam, setCreatingTeam] = useState(false);
    const [teamName, setTeamName] = useState(false);

    const createTeamMutation = `mutation createTeam($name:String!){
      createTeam(name: $name)
      {
        hash
      }
    }`;

    const createTeam = async variables => await dataFetch({ query: createTeamMutation, variables });

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

    return <Card
        title="Create a Team"
        content={
            <div className="px-4 py-2">
                <div className="form-group">
                    <label htmlFor="team-name-input">Team Name</label>
                    <input
                        id="team-name-input"
                        name="team-name-input"
                        className="form-control"
                        placeholder="Enter Team Name for creating a new team"
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                </div>
            </div>
        }
        footer={
            <button onClick={handleCreateTeam} className="btn btn-primary">Create Team</button>
        }
    />

};

export default CreateTeam;