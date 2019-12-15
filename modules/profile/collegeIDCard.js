import React from "react";
import Link from "next/link";

const CollegeIDPhoto = ({ collegeIDPhoto }) => {

    const renderNoProfilePhotoFound = (
        <div className="bg-white p-4 h-100 d-flex align-items-center text-center justify-content-center">
            <div>
                <img src={require('../../images/icons/selfie.png')} style={{ width: "120px", marginBottom: "1rem" }} />
                <h5>College ID Card Not Uploaded</h5>
                <p>Your college ID card is required as a proof for you being a student.</p>
                <Link href="/profile/upload-collegeID"><button className="btn px-4 py-2 rounded-0 ">Upload College ID</button></Link>
            </div>
        </div>
    );

    return (
        <div id="collegeID-edit-card" className="profile-edit-card card-shadow">
            <h4>My CollegeID</h4>
            {
                collegeIDPhoto ?
                    <div className="edit-body">
                        <img src={collegeIDPhoto} />
                        <Link href="/profile/upload-collegeID">
                            <button className="btn btn-primary px-4 py-2">Upload Again</button>
                        </Link>
                    </div>
                    : renderNoProfilePhotoFound
            }
        </div>
    )
};

export default CollegeIDPhoto;

