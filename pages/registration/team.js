import React, {useState} from "react";
import Link from "next/link";

import Base from "../../components/base";
import DashboardFooter from "../../modules/dashboard/footer";
import TitleBar from "../../components/titleBar";
import Card from "../../components/dashboard/Card";


const TeamRegistrationPage = () => {
    const [isOptionSelected, setOption] = useState(false);
    const [isCreated,setCreated] = useState();

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
                                />
                            </div>
                        </div>
                    }
                    footer={
                        <button className="btn btn-primary">Create Team</button>
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
                                />
                            </div>
                        </div>
                    }
                    footer={<button className="btn btn-primary">Join Team</button>}
                />
            </div>
        </div>
    );

    return <Base loginRequired>
        <TitleBar />
            <div className="container my-4">
                <h1>Register as a Team</h1>
                {
                    !isOptionSelected ? renderOptions : null
                }
            </div>
        <DashboardFooter/>
    </Base>
};
export default TeamRegistrationPage;