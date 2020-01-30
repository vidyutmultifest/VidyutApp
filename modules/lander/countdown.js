import React from "react";
import Countdown from "react-countdown";
import '../../styles/lander/countdown.sass';

const LanderCountdown = () => {

    return (
        <div id="lander-countdown">
            <div className="row m-0">
                <div className="col-md-4 order-2 order-md-1 p-0 campus-bg">
                    <div style={{ background: 'rgba(0,0,0,0.7)'}} className="h-100">
                        <div className="d-flex align-items-center h-100 p-4 justify-content-center">
                            <div>
                                <a href="https://amrita.edu">
                                    <img
                                        src={require('../../images/logos/amrita-light-logo.png')}
                                        className="animated zoomIn"
                                        style={{
                                            filter: "drop-shadow(2px 2px 10px rgba(0,0,0,0.5)"
                                        }}
                                    />
                                </a>
                                <div className="location text-md-left text-center">
                                    <div className="text-light mb-2" style={{ lineHeight: "1.1" }}>
                                        Vallikkavu, Clappana P.O. <br />
                                        Kollam, Kerala
                                    </div>
                                    <a href="https://goo.gl/maps/UQhvWT9cKJ266Az66">
                                        <div className="small-text mt-2 px-2 py-2 btn btn-primary">
                                            Open in Maps
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 order-md-2 order-1 countdown-bg p-0">
                    <div className="countdown-container h-100 d-flex justify-content-center align-items-center w-100 p-2" style={{ background: 'rgba(0,0,0,0.5)'}}>
                        <div className="text-center">
                            <h2 className="text-light mb-2">Event Schedule</h2>
                            <a
                                target="_blank"
                                href="https://drive.google.com/file/d/10j6LTVvQ8UkyuwTW5NXEyPh4EnoVBWz7/view?usp=drivesdk"
                                className="btn btn-primary px-4 py-2"
                            >
                                View Event Schedule
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default LanderCountdown;