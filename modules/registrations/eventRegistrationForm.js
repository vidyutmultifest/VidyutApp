import React, { useState } from "react";

const EventRegistrationForm = ({ fields, onSubmit, onClickBack, formData }) => {

    const [data, setData] = useState(formData !== undefined ? formData : []);
    const [validationError, setValidationError] = useState(false);
    const handleFormDataChange = (e) => {
        const formData = data;
        const fil = formData.filter(f => f.key === e.target.name);
        if (fil.length > 0)
        {
            fil[0].value = e.target.value;
        } else {
            formData.push({
                "key": e.target.name,
                "value": e.target.value,
                "label": fields.filter(f => f.key === e.target.name)[0].label
            });
        }
        setData(formData);
    };

    const getValFromKey = (key) => {
        return data.length > 0 ? data.filter(k => k.key === key)[0].value : null
    };

    const handleSubmit = () => {
        let flag = 0;
        if(!data.length) flag = 1;
        for(const d in data)
        {
            if(d.value === null || d.value === '') {
                console.log(d);
                flag = 1;
            }
        }
        if(!flag) onSubmit(data);
        else setValidationError('Please fill all the fields.');
    };

    return data ? (
        <div className="card-shadow p-4">
            <h3>Fill in Details</h3>
            {
                !validationError ? null : <div className="alert alert-danger">{validationError}</div>
            }
            <form>
                {
                    fields.map(f =>
                        <div key={f.key} className="form-group">
                            <label htmlFor={f.key}>{f.label}</label>
                            {
                                f.type === "textarea" ?
                                    <textarea name={f.key} value={getValFromKey(f.key)} onChange={handleFormDataChange} className="form-control" />
                                : <input name={f.key} value={getValFromKey(f.key)} onChange={handleFormDataChange} className="form-control" />
                            }
                        </div>
                    )
                }
            </form>
            <button className="btn btn-warning px-4 py-2 font-weight-bold mr-2" onClick={() => onClickBack()}>Go Back</button>
            <button className="btn btn-primary px-4 py-2 font-weight-bold" onClick={handleSubmit}>Proceed</button>
        </div>
    ) : null
};

export default EventRegistrationForm;