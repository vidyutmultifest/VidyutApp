import React, {useState} from "react";
import dataFetch from "../../utils/dataFetch";
import EditBasicDetails from "./basic";


const SwitchAccountType = ({ isSchoolStudent, isFaculty }) => {
    const [isSaving, setSaveState] = useState(false);
    const [current, setCurrent] = useState( isFaculty ? 'faculty' : isSchoolStudent ? 'school' : 'college');

    const mutation = `mutation updateEducationDetails($details:ProfileDetailsObj){
      updateProfile(details:$details)
      {
        status
      }
    }`;

    const saveData = async variables => await dataFetch({ query: mutation, variables });

    const handleSave = (variables) => {
        setSaveState(true);
        saveData(variables).then((response) => {
            setSaveState(false);
        });
    };

    const switchToFaculty = () => {
        const variables = {
            "details": {
                "isFaculty": true,
                "isSchoolStudent": false,
            }
        };
        setCurrent("faculty");
        handleSave(variables);
    };

    const switchToSchoolStudent = () => {
        const variables = {
            "details": {
                "isFaculty": false,
                "isSchoolStudent": true,
            }
        };
        handleSave(variables);
        setCurrent("school");
    };


    const switchToCollegeStudent = () => {
        const variables = {
            "details": {
                "isFaculty": false,
                "isSchoolStudent": false,
            }
        };
        handleSave(variables);
        setCurrent("college");
    };


    return (
        <div id="account-type-switcher-card" className="profile-edit-card card-shadow">
                <h4>Switch Account Type</h4>
                <div className="edit-body">
                    <div className="row m-0">
                        <b className="pr-2">Current Type: </b> {current === "faculty" ?
                            " Professional/Faculty" :
                            current === "school" ? " School Student" :
                                " College Student"
                    }
                        {
                            !isSaving ?
                                <React.Fragment>
                                    {
                                        current !== "faculty" ?
                                            <div className="col-6">
                                                <button onClick={switchToFaculty} className="switcher-button">
                                                    Professional / Faculty
                                                </button>
                                            </div>
                                            : null
                                    }
                                    {
                                        current !== "school" ?
                                            <div className="col-6">
                                                <button onClick={switchToSchoolStudent} className="switcher-button">
                                                    School Student
                                                </button>
                                            </div> : null
                                    }
                                    {
                                        current !== "college" ?
                                            <div className="col-6">
                                                <button onClick={switchToCollegeStudent} className="switcher-button">
                                                    College Student
                                                </button>
                                            </div> : null
                                    }
                                </React.Fragment>
                                : <div className="col-12 alert alert-info">Saving</div>
                        }
                    </div>
                    <p className="small-text text-danger">
                        Please note that switching your account type
                        <b> will invalidate any prior purchase/registration that are not applicable
                        for your new account type</b>. Please make sure you switch to the
                        valid account type before purchase. Contact support for more help.
                    </p>
                </div>
        </div>
    )
};

export default SwitchAccountType;