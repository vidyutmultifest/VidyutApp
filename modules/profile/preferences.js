import React, {useState} from "react";
import dataFetch from "../../utils/dataFetch";


const EditPreferences = ({ shirtSize, foodPreference }) => {

    const [isSaving, setSaveState] = useState(false);
    const [sSize, setSSize] = useState(shirtSize);
    const [fPre, setFPre] = useState(foodPreference);

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
                // "foodPreference": fPre,
                "shirtSize": sSize,
            }
        };
        setSaveState(true);
        saveData(variables).then((response) => {
            setSaveState(false);
        });
    };


    return (
        <div id="preference-edit-card" className="profile-edit-card card-shadow">
            <h4>My Preferences</h4>
            <div className="edit-body">
                <div className="form-group">
                    <label htmlFor="shirtSize-select">T-Shirt Size</label>
                    <select
                        className="form-control"
                        name="shirtSize-select"
                        id="shirtSize-select"
                        onChange={(e) => setSSize(e.target.value)}
                        value={sSize ? sSize : 'null'}
                    >
                        <option disabled value="null"> Select Size</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
                {/*<div className="form-group">*/}
                {/*    <label htmlFor="foodPreference-select">Food Preference</label>*/}
                {/*    <select*/}
                {/*        className="form-control"*/}
                {/*        name="foodPreference-select"*/}
                {/*        id="foodPreference-select"*/}
                {/*        onChange={(e) => setFPre(e.target.value)}*/}
                {/*        value={fPre ? fPre : 'null'}*/}
                {/*    >*/}
                {/*        <option disabled value="null"> Select Preference</option>*/}
                {/*        <option value="V">Vegetarian</option>*/}
                {/*        <option value="N">Non-Vegetarian</option>*/}
                {/*        <option value="A">Any</option>*/}
                {/*    </select>*/}
                {/*</div>*/}
                {
                    !isSaving ? <button onClick={handleSave} className="btn px-4 py-2">Save</button>
                        : <div className="alert alert-info">Saving</div>
                }
            </div>
        </div>
    )
};

export default EditPreferences;