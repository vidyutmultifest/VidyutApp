import React from "react";
import Countdown from 'react-countdown';
import AddToCalendar from 'react-add-to-calendar';

const VidyutCountDown = () => {

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <h1>Welcome to Vidyut 2020!</h1>
        } else {
            return (
                <div className="countdown-container px-md-4">
                    <div className="row m-0 text-center">
                        <div className="col-3">
                            <div className="part card-shadow p-2">
                                <span className="value">{days}</span>
                                <span className="key">Days</span>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="part card-shadow p-2">
                                <span className="value">{hours}</span>
                                <span className="key">Hours</span>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="part card-shadow p-2">
                                <span className="value">{minutes}</span>
                                <span className="key">Minutes</span>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="part card-shadow p-2">
                                <span className="value">{seconds}</span>
                                <span className="key">Seconds</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    };

    const calendar = () => (<div className="text-center">
        <AddToCalendar
            buttonWrapperClass="btn btn-light add-to-calendar-button px-4 py-2"
            dropdownClass="dropdown card-shadow p-2"
            event={{
                title: 'Vidyut Multifest @ Amritapuri',
                description: 'You can know more about Vidyut and register for events through vidyut.amrita.edu',
                location: 'Amrita Vishwa Vidyapeetham, Amritapuri Campus',
                startTime: '2020-01-30T00:00:00+05:30',
                endTime: '2020-02-01T23:59:59+05:30'
            }}
        />
    </div>);

    return (
        <div className="card-shadow m-2 bg-gradient-insta px-2 py-4">
            <h4 className="mb-2 text-center">See you in</h4>
            <Countdown
                date={new Date("30-Jan-2020")}
                renderer={renderer}
            />
        </div>
    );
};

export default VidyutCountDown;