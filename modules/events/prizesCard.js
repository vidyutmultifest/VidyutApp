import React from "react";

const PrizesCard = ({ firstPrize, secondPrize, thirdPrize }) => (
    <div id="prizes-card" className="card-shadow p-4 my-4">
        <h4>Prizes</h4>
        {
            firstPrize ? (
                <div className="row">
                    <div className="col-3">
                        <img src={require('../../images/icons/firstPrize.png')} />
                    </div>
                    <div className="col-9">
                        <div className="prizeType">First Prize</div>
                        <div className="prizeAmount">₹{firstPrize}</div>
                    </div>
                </div>
            ) : null
        }
        {
            secondPrize ? (
                <div className="row">
                    <div className="col-3">
                        <img src={require('../../images/icons/secondPrize.png')} />
                    </div>
                    <div className="col-9">
                        <div className="prizeType">Second Prize</div>
                        <div className="prizeAmount">₹{secondPrize}</div>
                    </div>
                </div>
            ) : null
        }
        {
            thirdPrize ? (
                <div className="row">
                    <div className="col-3">
                        <img src={require('../../images/icons/thirdPrize.png')} />
                    </div>
                    <div className="col-9">
                        <div className="prizeType">Third Prize</div>
                        { parseInt(thirdPrize) ?
                            <div className="prizeAmount">₹{thirdPrize}`</div>
                            : <div>{thirdPrize}</div>
                        }
                    </div>
                </div>
            ) : null
        }
    </div>
);

export default PrizesCard;