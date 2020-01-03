import React from "react";
import Link from "next/link";

const OptionMenuCards = ({ status }) => {

    return (<div className="row m-0 p-2">
        <div className="col-md-3 col-6 p-0">
            <div className="option-menu-card card-shadow">
                <Link href="/payment/view-orders">
                    <a>
                        <img src={require('../../images/icons/invoice.png')} />
                        <h4>Orders</h4>
                    </a>
                </Link>
            </div>
        </div>
        <div className="col-md-3 col-6 p-0">
            <div className="option-menu-card card-shadow">
                <Link href="/registrations/my-registrations">
                    <a>
                        <img src={require('../../images/icons/check-list.png')} />
                        <h4>Registrations</h4>
                    </a>
                </Link>
            </div>
        </div>
        <div className="col-md-3 col-6 p-0">
            <div className="option-menu-card card-shadow">
                <Link href="/teams/my-teams">
                    <a>
                        <img src={require('../../images/icons/user-group.png')} />
                        <h4>Teams</h4>
                    </a>
                </Link>
            </div>
        </div>
        <div className="col-md-3 col-6 p-0">
            <div className="option-menu-card card-shadow">
                <Link href="/my-schedule">
                    <a>
                        <img src={require('../../images/icons/calendar.png')} />
                        <h4>Schedule</h4>
                    </a>
                </Link>
            </div>
        </div>
    </div>)
};

export default OptionMenuCards;