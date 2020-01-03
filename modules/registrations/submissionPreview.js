import React from "react";

const SubmissionPreview = ({ team, formData, onSubmit, onClickBack }) => {

    const renderFormData = formData ? (
        <div className="card-shadow my-4 p-4">
            <h3>Details Submitted</h3>
            {
                 formData.map(f => (
                <div key={f.key}>
                    <div><b>{f.label}</b></div>
                    {f.value}
                </div>
            ))
            }
        </div>
    ) : null;

    const renderTeamDetails = () => (
        <div className="card-shadow my-4 p-4">
            <h3>Team: {team.name}</h3>
            {
               team.members ?
                team.members.map((m,i) => (
                    <div key={m.name}>{i+1}. <b>{m.name}</b></div>
                )) : null
            }
        </div>
    );

    return (
        <div className="card-shadow bg-gradient p-4">
            <h3 className="text-light mb-4">Review your Registration</h3>
            {renderFormData}
            {team ? renderTeamDetails() : null}
            <button className="btn btn-warning px-4 py-2 font-weight-bold m-2" onClick={() => onClickBack()}>Go Back</button>
            <button className="btn btn-light px-4 py-2 font-weight-bold m-2" onClick={() => onSubmit()}>Register</button>
        </div>
    )
};
export default SubmissionPreview;