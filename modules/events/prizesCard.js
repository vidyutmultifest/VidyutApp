import React from "react";

const PrizesCard = ({ firstPrize, secondPrize, thirdPrize, otherPrizes }) => (
    <div id="prizes-card" className="card-shadow rounded p-4 my-4">
        <h5>
            <img src={require('../../images/icons/prize-icon.png')} style={{ width: "2rem" }} className="icon-img m-2" />
            Prizes
        </h5>
        {
            firstPrize ? (
                <div className="row">
                    <div className="col-3">
                        <img src={require('../../images/icons/firstPrize.png')} />
                    </div>
                    <div className="col-9">
                        <div className="prizeType">First Prize</div>
                        { !isNaN(firstPrize) ?
                            <div className="prizeAmount">₹{firstPrize}</div>
                            : <div>{firstPrize}</div>
                        }
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
                        { !isNaN(secondPrize) ?
                            <div className="prizeAmount">₹{secondPrize}</div>
                            : <div>{secondPrize}</div>
                        }
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
                        { !isNaN(thirdPrize) ?
                            <div className="prizeAmount">₹{thirdPrize}</div>
                            : <div>{thirdPrize}</div>
                        }
                    </div>
                </div>
            ) : null
        }
        {
            otherPrizes ? (
                <div className="row">
                    <div className="col-3">
                        <img src={require('../../images/icons/thirdPrize.png')} />
                    </div>
                    <div className="col-9">
                        <div className="prizeType">Other Prizes</div>
                        <div>{otherPrizes}</div>
                    </div>
                </div>
            ) : null
        }
    </div>
);

export default PrizesCard;