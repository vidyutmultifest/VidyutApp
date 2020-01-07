import React from "react";
import Countdown from "react-countdown";
import '../../styles/lander/countdown.sass';

const LanderCountdown = () => {
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <h1>Welcome to Vidyut 2020!</h1>
        } else {
            return (
                <div className="w-100">
                    <div className="row m-0 text-center">
                        <div className="col-6 col-sm-3 p-2">
                            <div className="part p-2">
                                <span className="value">{days}</span>
                                <span className="key">Days</span>
                            </div>
                        </div>
                        <div className="col-6 col-sm-3 p-2">
                            <div className="part p-2">
                                <span className="value">{hours}</span>
                                <span className="key">Hours</span>
                            </div>
                        </div>
                        <div className="col-6 col-sm-3 p-2">
                            <div className="part p-2">
                                <span className="value">{minutes}</span>
                                <span className="key">Minutes</span>
                            </div>
                        </div>
                        <div className="col-6 col-sm-3 p-2">
                            <div className="part p-2">
                                <span className="value">{seconds}</span>
                                <span className="key">Seconds</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    };

    return (
        <div id="lander-countdown">
            <div className="row m-0">
                <div className="col-md-4 p-0 campus-bg">
                    <div style={{ background: 'rgba(0,0,0,0.7)'}} className="h-100">
                        <div className="d-flex align-items-center h-100 p-4 justify-content-center">
                            <div>
                                <img
                                    src={require('../../images/logos/amrita-light-logo.png')}
                                    style={{
                                        filter: "drop-shadow(2px 2px 10px rgba(0,0,0,0.5)"
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 countdown-bg p-0">
                    <div className="countdown-container h-100 d-flex align-items-center w-100 p-2" style={{ background: 'rgba(0,0,0,0.5)'}}>
                        <Countdown
                            date={new Date("30-Jan-2020")}
                            renderer={renderer}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
};

export default LanderCountdown;