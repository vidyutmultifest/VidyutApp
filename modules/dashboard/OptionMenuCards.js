import React from "react";

const QuickActionCards = ({ status }) => {

    return (<div className="row m-0">
        <div className="col-md-4 col-6 p-2">
            <div className="card-shadow bg-gradient">
                <h4>My Orders</h4>
            </div>
        </div>
        <div className="col-md-4 col-6 p-2">
            <div className="card-shadow bg-gradient">
                <h4>My Registrations</h4>
            </div>
        </div>
        <div className="col-md-4 col-6 p-2">
            <div className="card-shadow bg-gradient">
                <h4>My Teams</h4>
            </div>
        </div>
        <div className="col-md-4 col-6 p-2">
            <div className="card-shadow bg-gradient">
                <h4>My Teams</h4>
            </div>
        </div>
    </div>)
};

export default QuickActionCards;