import React, { useState } from "react";

const EventRegistrationForm = ({ fields, onSubmit, onClickBack, formData, showBackButton }) => {

    const [data, setData] = useState(formData ? formData : []);
    const [validationError, setValidationError] = useState(false);

    const handleFormDataChange = (e) => {
        let fd = [...data];
        const fil = fd.filter(f => f.key === e.target.name);
        if (fil.length > 0)
        {
            fil[0].value = e.target.value;
        } else {
            fd = [...fd, {
                "key": e.target.name,
                "value": e.target.value,
                "label": fields.filter(f => f.key === e.target.name)[0].label
            }];
        }
        setData(fd);
    };


    const handleCheckboxChange = (e) => {
        let fd = [...data];
        const fil = fd.filter(f => f.key === e.target.name);
        if (fil.length > 0)
        {
            const curr = fil[0].value;
            if(curr.includes(e.target.value))
                fil[0].value = curr.filter(item => item !== e.target.value);
            else
                fil[0].value = [...curr, e.target.value];
        } else {
            fd = [...fd, {
                "key": e.target.name,
                "value": [e.target.value],
                "label": fields.filter(f => f.key === e.target.name)[0].label
            }];
        }
        setData(fd);
    };

    const handleSubmit = () => {
        let flag = 0;
        if(!data.length) flag = 1;
        if(data.length !== fields.length) flag = 1;
        for(const d in data)
        {
            if(d && d.value === null || d.value === '' || d.value === []) {
                flag = 1;
            }
        }
        if(!flag) onSubmit(data);
        else setValidationError('Please fill all the fields.');
    };


    return data ? (
        <div className="card-shadow p-4">
            <h3>Fill in Details</h3>
            {!validationError ? null : <div className="alert alert-danger">{validationError}</div>}
            <form>
                {
                    fields.map(f =>
                        <div key={f.key} className="form-group">
                            <label htmlFor={f.key}>{f.label}</label>
                            {
                                f.type === "textarea" ?
                                    <textarea
                                        name={f.key}
                                        value={data.length > 0 && data.filter(k => k.key === f.key)[0] ?
                                            data.filter(k => k.key === f.key)[0].value
                                            : null
                                        }
                                        onChange={handleFormDataChange}
                                        className="form-control"
                                    />
                                : f.type === "checkbox" ?
                                    <div>
                                        {
                                           f.options.map( o => (
                                                <div className="form-check">
                                                    <input
                                                        name={f.key}
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={o.key}
                                                        checked={
                                                            data.length > 0 && data.filter(k => k.key === f.key).length > 0 ?
                                                                data.filter(k => k.key === f.key)[0].value.includes(o.key) : null
                                                        }
                                                        value={o.key}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <label className="form-check-label" htmlFor={o.key}>
                                                        {o.label}
                                                    </label>
                                                </div>
                                            ))
                                        }
                                    </div>
                                : <input
                                    name={f.key}
                                    value={data.length > 0 && data.filter(k => k.key === f.key)[0] ?
                                        data.filter(k => k.key === f.key)[0].value
                                        : null
                                    }
                                    onChange={handleFormDataChange} className="form-control"
                                />
                            }
                        </div>
                    )
                }
            </form>
            {
                showBackButton ?
                    <button className="btn btn-warning px-4 py-2 font-weight-bold m-2" onClick={() => onClickBack()}>Go
                        Back</button>
                    : null
            }
                <button className="btn btn-primary px-4 py-2 font-weight-bold m-2" onClick={handleSubmit}>Proceed</button>
        </div>
    ) : null
};

export default EventRegistrationForm;