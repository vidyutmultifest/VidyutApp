import React from "react";
import Link from "next/link";

const ProfileCompletionItems = ({ title, photo, text, link }) => (
    <Link href={link}>
        <div className="profile-completion-item">
            <div>
                <img src={photo} />
            </div>
            <div>
                <h6>{title}</h6>
                <p>{text}</p>
            </div>
        </div>
    </Link>
);

export default ProfileCompletionItems;