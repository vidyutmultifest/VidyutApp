import React from "react";

import '../../styles/dashboard/style.sass';

const Card = ({ title, footer, content }) => (
    <div className="srx-card card-shadow">
        <div className="title-area"><h4>{title}</h4></div>
        <div className="content-area">{content}</div>
        { footer ? <div className="footer-area">{footer}</div> : null }
    </div>
);

export default Card;