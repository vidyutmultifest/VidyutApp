import React from "react";
import Link from "next/link";

const ProfilePicture = ({ profilePhoto }) => {

    const renderNoProfilePhotoFound = (
        <div className="p-4 h-100 d-flex align-items-center text-center justify-content-center">
            <div>
                <img src={require('../../images/icons/selfie.png')} style={{ width: "120px", marginBottom: "1rem" }} />
                <h5>Selfie Not Uploaded</h5>
                <p>A photo of your face is required to enter Vidyut 2020, for security reasons</p>
                <Link href="/profile/upload-selfie"><bbutton className="btn btn-primary px-4 py-2 rounded-0">Upload Selfie</bbutton></Link>
            </div>
        </div>
    );

    return (
        <div id="vidyut-profile-edit-card" className="profile-edit-card card-shadow">
            <h4>My Selfie</h4>
            {
                profilePhoto ?
                    <div className="edit-body">
                        <img alt="my selfie" src={profilePhoto} />
                        <Link href="/profile/upload-selfie">
                            <button className="btn btn-primary px-4 py-2">Retake Selfie</button>
                        </Link>
                    </div>
                    : renderNoProfilePhotoFound
            }
        </div>
    )
};

export default ProfilePicture;

