import React from "react";

const ProfileCompletionItems = ({ title, photo, text }) => (
    <div className="profile-completion-item">
        <div>
            <img src={photo} />
        </div>
        <div>
            <h6>{title}</h6>
            <p>{text}</p>
        </div>
    </div>
);

export default ProfileCompletionItems;