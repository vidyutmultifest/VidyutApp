import React, {useEffect, useState} from "react";
import CreatableSelect from 'react-select/creatable';
import dataFetch from "../../utils/dataFetch";


const EducationDetails = ({ collegeID, collegeName, isAmritian, isAmritapurian, rollNo, graduationYear, degreeType }) => {
    const [isQueried, setQueried] = useState(false);
    const [CollegeList, setCollegeList] = useState(false);

    const [dType, setDegree] = useState(degreeType);
    const [gradYear, setGradYear] = useState(graduationYear);
    const [rno, setRNo] = useState(rollNo);
    const [cid, setCID] = useState({ value: collegeID, label: collegeName });
    const [isSaving, setSaveState] = useState(false);
    const query = `{
      colleges
      {
        value: id
        label: name
      }
    }`;

    const mutation = `mutation updateEducationDetails($details:ProfileDetailsObj){
      updateProfile(details:$details)
      {
        status
      }
    }`;

    const createCollegeMutation = `mutation createCollegeMutation($name:String!){
      addCollege(name:$name)
      {
        id
      }
    }`;

    const getCollegeList = async () => await dataFetch({ query });
    const saveData = async variables => await dataFetch({ query: mutation, variables });
    const createCollege = async variables => await dataFetch({ query: createCollegeMutation, variables });


    const handleSave = () => {
        const variables = {
            "details": {
                "degreeType": dType,
                "graduationYear": gradYear,
                "collegeID": parseInt(cid.value),
                "rollNo": rno
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

    return (
        <div id="education-edit-card" className="profile-edit-card card-shadow">
            <h4>My Education</h4>
            <div className="edit-body">
                <div className="form-group">
                    <label htmlFor="degree-select">Degree Type</label>
                    <select
                        className="form-control"
                        name="degree-select"
                        id="degree-select"
                        value={dType ? dType : "null"}
                        onChange={(e) => setDegree(e.target.value)}
                    >
                        <option disabled value="null"> Select Degree Type</option>
                        <option value="primary school">Primary School</option>
                        <option value="high school">High School</option>
                        <option value="associate">Associate</option>
                        <option value="bachelors">Bachelors</option>
                        <option value="masters">Masters</option>
                        <option value="phd">PhD</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="institution-input">Educational Institution</label>
                    {renderCollegeSelector}
                </div>
                <div className="form-group">
                    <label htmlFor="gradyear-select">Expected Year of Graduation</label>
                    <select
                        name="gradyear-select"
                        id="gradyear-select"
                        className="form-control"
                        value={gradYear ? gradYear : "null"}
                        onChange={(e) => setGradYear(e.target.value)}
                    >
                        <option disabled value="null"> Select Graduation Year</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="rno-input">Roll Number (Required for Amritians)</label>
                    <input
                        id="rno-input"
                        name="rno-input"
                        className="form-control"
                        value={rno}
                        onChange={(e) => setRNo(e.target.value)}
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

export default EducationDetails;