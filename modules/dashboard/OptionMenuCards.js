import React from "react";
import Link from "next/link";

const OptionMenuCards = ({ status }) => {

    return (<div className="row m-0 p-2">
        <div className="col-md-4 col-6 p-0">
            <Link href="/dashboard">
                <div className="option-menu-card card-shadow">
                    <h4>My Orders</h4>
                </div>
            </Link>
        </div>
        <div className="col-md-4 col-6 p-0">
            <Link href="/registrations/my-registrations">
                <div className="option-menu-card card-shadow">
                    <h4>My Registrations</h4>
                </div>
            </Link>
        </div>
        <div className="col-md-4 col-6 p-0">
            <Link href="/teams/my-teams">
                <div className="option-menu-card card-shadow">
                    <h4>My Teams</h4>
                </div>
            </Link>
        </div>
    </div>)
};

export default OptionMenuCards;