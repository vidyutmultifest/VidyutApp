import React from "react";

const CollegeIDPhoto = ({ collegeIDPhoto }) => {

    const renderNoProfilePhotoFound = (
        <div className="bg-white p-4 h-100">
            <h5>No College ID Found</h5>
            <p>A photo of your face is required to enter Vidyut 2020, for security reasons</p>
        </div>
    );

    return (
        <div id="collegeID-edit-card" className="profile-edit-card card-shadow">
            <h4>My CollegeID</h4>
            <div className="edit-body">
                {
                    collegeIDPhoto ? <img src={collegeIDPhoto} /> :
                        renderNoProfilePhotoFound
                }

            </div>
        </div>
    )
};

export default CollegeIDPhoto;

