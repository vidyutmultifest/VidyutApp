import React, {useState} from "react";
import dataFetch from "../../utils/dataFetch";


const EditBasicDetails = ({ firstName, lastName, gender }) => {
    const [isSaving, setSaveState] = useState(false);
    const [fname, setFName] = useState(firstName);
    const [lname, setLName] = useState(lastName);
    const [sex, setSex] = useState(gender);

    const mutation = `mutation updateEducationDetails($details:ProfileDetailsObj){
      updateProfile(details:$details)
      {
        status
      }
    }`;
    const saveData = async variables => await dataFetch({ query: mutation, variables });

    const handleSave = () => {
        const variables = {
            "details": {
                "firstName": fname,
                "lastName": lname,
                "gender": sex
            }
        };
        setSaveState(true);
        saveData(variables).then((response) => {
            setSaveState(false);
        });
    };


    return (
        <div id="about-edit-card" className="profile-edit-card card-shadow">
            <h4>About Me</h4>
            <div className="edit-body">
                <div className="form-group">
                    <label htmlFor="firstName-input">First Name</label>
                    <input
                        name="firstName-input"
                        id="firstName-input"
                        className="form-control"
                        placeholder="Enter your First Name"
                        onChange={(e) => setFName(e.target.value)}
                        value={fname}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName-input">Last Name</label>
                    <input
                        name="lastName-input"
                        id="lastName-input"
                        className="form-control"
                        placeholder="Enter your Last Name"
                        onChange={(e) => setLName(e.target.value)}
                        value={lname}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gender-select">Gender</label>
                    <select
                        className="form-control"
                        name="gender-select"
                        id="gender-select"
                        onChange={(e) => setSex(e.target.value)}
                        value={sex ? sex : 'null'}
                    >
                        <option disabled value="null"> Select Gender</option>
                        <option value="F">Female</option>
                        <option value="M">Male</option>
                        <option value="T">Transgender</option>
                        <option value="N">Non-Binary, genderqueer, or gender non-conforming</option>
                        <option value="U">Prefer not to say</option>
                    </select>
                </div>
                {
                    !isSaving ? <button onClick={handleSave} className="btn px-4 py-2">Save</button>
                        : <div className="alert alert-info">Saving</div>
                }
            </div>
        </div>
    )
};

export default EditBasicDetails;