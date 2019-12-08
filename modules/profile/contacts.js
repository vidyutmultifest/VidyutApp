import React, {useState} from "react";
import dataFetch from "../../utils/dataFetch";


const EditContacts = ({ email, phone, location }) => {
    const [isSaving, setSaveState] = useState(false);
    const [city, setCity] = useState(location);
    const [ph, setPhone] = useState(phone);

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
                "location": city,
                "phone": ph
            }
        };
        setSaveState(true);
        saveData(variables).then((response) => {
            setSaveState(false);
        });
    };

    return (
        <div id="contact-edit-card" className="profile-edit-card card-shadow">
            <h4>My Contact Details</h4>
            <div className="edit-body">
                <div className="form-group">
                    <label htmlFor="email-input">Email</label>
                    <input
                        name="email-input"
                        id="email-input"
                        className="form-control"
                        placeholder="Enter your Email"
                        disabled
                        value={email}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone-input">Phone Number</label>
                    <input
                        name="phone-input"
                        id="phone-input"
                        className="form-control"
                        placeholder="Enter your Phone Number"
                        onChange={(e) => setPhone(e.target.value)}
                        value={ph}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location-input">City (Place of Origin)</label>
                    <input
                        name="location-input"
                        id="location-input"
                        className="form-control"
                        placeholder="Enter your Location"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
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

export default EditContacts;