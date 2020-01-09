import React, {useEffect, useState} from "react";
import dataFetch from "../../utils/dataFetch";
import CreatableSelect from 'react-select/creatable';

const QuickEditCard = ({ hasEventsRegistered, isAmritapurian, phone, rollNo, shirtSize, collegeID, collegeName}) => {
    const [sSize, setSSize] = useState(shirtSize);
    const [rno, setRNo] = useState(rollNo);
    const [ph, setPhone] = useState(phone);
    const [isSaving, setSaveState] = useState(false);
    const [isQueried, setQueried] = useState(false);
    const [CollegeList, setCollegeList] = useState(false);
    const [cid, setCID] = useState({ value: collegeID, label: collegeName });

    const createCollegeMutation = `mutation createCollegeMutation($name:String!){
      addCollege(name:$name)
      {
        id
      }
    }`;

    const createCollege = async variables => await dataFetch({ query: createCollegeMutation, variables });

    const query = `{
      colleges
      {
        value: id
        label: name
      }
    }`;

    const getCollegeList = async () => await dataFetch({ query });

    const mutation = `mutation updateRequiredDetails($details:ProfileDetailsObj){
      updateProfile(details:$details)
      {
        status
      }
    }`;

    const saveData = async variables => await dataFetch({ query: mutation, variables });

    const handleSave = () => {
        const variables = {
            "details": {
                "shirtSize": sSize,
                "phone": ph,
                "rollNo": rno,
                "collegeID": parseInt(cid.value),
            }
        };
        setSaveState(true);
        saveData(variables).then((response) => {
            setSaveState(false);
        });
    };

    const handleCreation = (value) => {
        createCollege({ "name": value }).then((response) => {
            setCID({value: response.data.addCollege.id, label: value});
        });
    };

    useEffect(() => {
        if(!isQueried)
        {
            getCollegeList().then((response) =>{
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setCollegeList(response.data.colleges);
                }
            })
        }
    });

    const renderCollegeSelector = CollegeList ? (
        <CreatableSelect
            id="institution-input"
            value={cid}
            placeholder="Enter/Select Institution Name"
            onChange={(newValue) => setCID(newValue)}
            onCreateOption={(val) => handleCreation(val)}
            options={CollegeList}
        />
    ) : null;

    return isAmritapurian && hasEventsRegistered && !(phone !== null && rollNo !== null && shirtSize !== null) ? (
        <div className="bg-gradient-red text-light card-shadow mt-4 p-4">
            <h1>Complete Your Profile</h1>
            <div className="pb-4 small-text">Without completing your profile, your purchases are still considered invalid.</div>
            <div className="card-shadow p-4">
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
                <div className="form-group">
                    <label htmlFor="institution-input">Select Exact College (like Engineering, Arts etc.)</label>
                    {renderCollegeSelector}
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
                    <label htmlFor="rno-input">Roll Number (Required for Amritapurians)</label>
                    <input
                        id="rno-input"
                        name="rno-input"
                        className="form-control"
                        value={rno}
                        onChange={(e) => setRNo(e.target.value)}
                    />
                </div>
                {
                    !isSaving ? <button onClick={handleSave} className="btn btn-primary rounded-0 px-4 py-2">Save</button>
                        : <div className="alert alert-info">Saving</div>
                }
            </div>
        </div>
    ) : null

};

export default QuickEditCard;