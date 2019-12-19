import React from "react";

const PrizesCard = ({ firstPrize, secondPrize, thirdPrize }) => (
    <div id="prizes-card" className="card-shadow p-4 my-4">
        <h4>Prizes</h4>
        <div className="row">
            <div className="col-3">
                <img src={require('../../images/icons/firstPrize.png')} />
            </div>
            <div className="col-9">
                <div className="prizeType">First Prize</div>
                <div className="prizeAmount">₹{firstPrize}</div>
            </div>
        </div>
        <div className="row">
            <div className="col-3">
                <img src={require('../../images/icons/secondPrize.png')} />
            </div>
            <div className="col-9">
                <div className="prizeType">Second Prize</div>
                <div className="prizeAmount">₹{secondPrize}</div>
            </div>
        </div>
        <div className="row">
            <div className="col-3">
                <img src={require('../../images/icons/thirdPrize.png')} />
            </div>
            <div className="col-9">
                <div className="prizeType">Third Prize</div>
                <div className="prizeAmount">₹{thirdPrize}</div>
            </div>
        </div>
    </div>
);

export default PrizesCard;