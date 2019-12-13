import React from "react";
import Link from "next/link";

const OptionMenuCards = ({ status }) => {

    return (<div className="row m-0">
        <div className="col-md-4 col-6 p-2">
            <Link href="/dashboard">
                <div className="card-shadow p-4">
                    <h4>My Orders</h4>
                </div>
            </Link>
        </div>
        <div className="col-md-4 col-6 p-2">
            <Link href="/registrations/my-registrations">
                <div className="card-shadow p-4">
                    <h4>My Registrations</h4>
                </div>
            </Link>
        </div>
        <div className="col-md-4 col-6 p-2">
            <Link href="/teams/my-teams">
                <div className="card-shadow p-4">
                    <h4>My Teams</h4>
                </div>
            </Link>
        </div>
    </div>)
};

export default OptionMenuCards;