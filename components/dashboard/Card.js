import React from "react";
import Link from "next/link";

const Card = ({ title, footer, content }) => (
    <div className="srx-card card-shadow">
        <div className="title-area"><h4>{title}</h4></div>
        <div className="content-area">{content}</div>
        <div className="footer-area">{footer}</div>
    </div>
);

export default Card;