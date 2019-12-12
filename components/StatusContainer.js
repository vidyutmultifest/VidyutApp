import React from "react";
import '../styles/statuscontainer.sass';

const StatusContainer = ({ title, image, text, buttons }) => (
    <div id="status-container">
        <div>
            <img src={image} />
            <h2>{title}</h2>
            <p>{text}</p>
            {buttons}
        </div>
    </div>
);

export default StatusContainer;