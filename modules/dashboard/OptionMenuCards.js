import React from "react";
import Link from "next/link";

const OptionMenuCards = ({ status }) => {

    return (<div className="row m-0 p-2">
        <div className="col-md-3 col-6 p-0">
            <Link href="/payment/view-orders">
                <div className="option-menu-card card-shadow">
                    <div>
                        <img src={require('../../images/icons/delivery-box-world.png')} />
                        <h4>Orders</h4>
                    </div>
                </div>
            </Link>
        </div>
        <div className="col-md-3 col-6 p-0">
            <Link href="/registrations/my-registrations">
                <div className="option-menu-card card-shadow">
                    <div>
                        <img src={require('../../images/icons/inspection.png')} />
                        <h4>Registrations</h4>
                    </div>
                </div>
            </Link>
        </div>
        <div className="col-md-3 col-6 p-0">
            <Link href="/teams/my-teams">
                <div className="option-menu-card card-shadow">
                    <div>
                        <img src={require('../../images/icons/user-group.png')} />
                        <h4>Teams</h4>
                    </div>
                </div>
            </Link>
        </div>
        <div className="col-md-3 col-6 p-0">
            <Link href="/my-schedule">
                <div className="option-menu-card card-shadow">
                    <div>
                        <img src={require('../../images/icons/calendar.png')} />
                        <h4>Schedule</h4>
                    </div>
                </div>
            </Link>
        </div>
    </div>)
};

export default OptionMenuCards;