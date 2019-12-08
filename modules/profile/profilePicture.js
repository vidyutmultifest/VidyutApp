import React from "react";

const ProfilePicture = ({ profilePhoto }) => {

    const renderNoProfilePhotoFound = (
        <div className="bg-white p-4 h-100">
            <h5>No Selfie Found</h5>
            <p>A photo of your face is required to enter Vidyut 2020, for security reasons</p>
        </div>
    );

    return (
        <div id="vidyut-profile-edit-card" className="profile-edit-card card-shadow">
            <h4>My Selfie</h4>
            <div className="edit-body">
                {
                    profilePhoto ? <img src={profilePhoto} /> :
                        renderNoProfilePhotoFound
                }

            </div>
        </div>
    )
};

export default ProfilePicture;

