import React from "react";
import moment from "moment";

const ScheduleCard = ({ schedule }) => {

    return schedule && schedule.length > 0 ? (
        <div className="card-shadow rounded my-4 p-4">
            <h5>
                <img src={require('../../images/icons/calendar-icon.png')} style={{ width: "2rem" }} className="icon-img m-2" />
                Schedule
            </h5>
            {
                schedule.map((s,i) => (
                    <div className="py-3">
                        <div className="font-weight-bold">Event Day {i+1} - {moment(s.slot.startTime).format("DD/MM/YY")}</div>
                        <div>{moment(s.slot.startTime).format("h:mm a")} - {moment(s.slot.endTime).format("h:mm a")}</div>
                    </div>
                ))
            }
        </div>
    ) : null;
};

export default ScheduleCard;