import React, {useState} from "react";
import dataFetch from "../../utils/dataFetch";


const EmergencyContacts = ({ emergencyContactName, emergencyContactNumber }) => {

    const [isSaving, setSaveState] = useState(false);
    const [eName, setEName] = useState(emergencyContactName);
    const [ePhone, setEPhone] = useState(emergencyContactNumber);

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
                "emergencyContactName": eName,
                "emergencyPhone": ePhone,
            }
        };
        setSaveState(true);
        saveData(variables).then((response) => {
            setSaveState(false);
        });
    };


    return (
        <div id="emergency-edit-card" className="profile-edit-card card-shadow">
            <h4>My Lifelines</h4>
            <div className="edit-body">
                <div className="form-group">
                    <label htmlFor="emergencyContactName-input">Emergency Contact Name</label>
                    <input
                        name="emergencyContactName-input"
                        id="emergencyContactName-input"
                        className="form-control"
                        placeholder="Enter Emergency Contact Name"
                        onChange={(e) => setEName(e.target.value)}
                        value={eName}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="emergencyContactNumber-input">Emergency Contact Number</label>
                    <input
                        name="emergencyContactNumber-input"
                        id="emergencyContactNumber-input"
                        className="form-control"
                        placeholder="Enter your Phone Number"
                        onChange={(e) => setEPhone(e.target.value)}
                        value={ePhone}
                    />
                </div>
                {
                    !isSaving ? <button onClick={handleSave} className="btn px-4 py-2">Save</button>
                        : <div className="alert alert-info">Saving</div>
                }
            </div>
        </div>
    )
};

export default EmergencyContacts;