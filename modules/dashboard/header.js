import React from "react";

const DashboardHeader = ({ data }) => {

    return (
        <div id="dashboard-header" className="bg-gradient">
            <span>
                <h1><i>Hello</i> {data.firstName}!</h1>
                <p>
                    Thank you for showing interest and registering. We are committed to give you an exciting and memorable experience.
                    We look forward to welcome you at Vidyut Multifest 2020, the only one of its kind college festival in India.
                </p>
            </span>
        </div>
    )
};

export default DashboardHeader;