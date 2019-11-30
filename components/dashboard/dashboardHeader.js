import React from "react";
import "../../styles/dashboard/dashboardheader.sass"

const DashboardHeader = ({ name, message }) => {

    return (
        <div id="dashboard-header" className="bg-gradient">
            <span>
                <h1><i>Hello</i> {name}!</h1>
                <p>{message}</p>
            </span>
        </div>
    )
};

export default DashboardHeader;