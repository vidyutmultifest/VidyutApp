import React from 'react'
import '../../styles/dashboard/profilecard.sass'
import ProfileCompletionItems from "../../components/dashboard/ProfileCompletionItems";
import QuickListCard from "../../components/dashboard/QuickListCard";

const ProfileCard = ({ data }) => {

    const hasCompleted = () =>
    {
        return data.photo != null && data.phone != null && data.college != null && data.location != null;
    };

    const profileCompleteCard = (
        <React.Fragment>
            <h4>Profile Complete</h4>
        </React.Fragment>
    );


    const photoCompletion = data.photo != null ?
        <ProfileCompletionItems
            title="Selfie Uploaded"
            text="We will never share your photo with anyone."
            photo={require('../../images/icons/checked.png')}
            link="/profile/upload-selfie"
        /> : <ProfileCompletionItems
            title="Upload Selfie"
            text="Due to security reasons, uploading your selfie is mandatory for attending Vidyut."
            link="/profile/upload-selfie"
            photo={require('../../images/icons/selfie.png')}
        />;

    const collegeCompletion = data.college != null && data.rollNo != null ?
        <ProfileCompletionItems
            title="College Detail Updated"
            text="Vidyut is open only to college students, thank you for co-operating."
            link="/profile/upload-collegeID"
            photo={require('../../images/icons/checked.png')}
        /> : <ProfileCompletionItems
            title="Update College Details"
            text="We need to verify that you are student of a college before we can allow you at Vidyut"
            photo={require('../../images/icons/student-center.png')}
            link="/profile/upload-collegeID"
        />;

    const phoneCompletion = data.phone !== '' && data.phone != null ?
        <ProfileCompletionItems
            title="Phone Number Updated"
            text="Thank you for sharing your phone number, we will not become telemarketers :P"
            photo={require('../../images/icons/checked.png')}
            link="/profile/edit-profile"
        /> : <ProfileCompletionItems
            title="Update Phone Number"
            text="We need to know your phone number for communication regarding Vidyut"
            link="/profile/edit-profile"
            photo={require('../../images/icons/ringing-phone.png')}
        />;

    return (
        <QuickListCard
            title="Complete Your Profile"
            items={[
                photoCompletion,
                collegeCompletion,
                phoneCompletion
            ]}
            showMoreButton={{
                "link": "/profile/edit-profile",
                "text": "Edit Profile"
            }}
        />
    )

};

export default ProfileCard;