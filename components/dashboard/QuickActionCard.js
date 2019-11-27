import React from "react";
import Link from "next/link";

const QuickActionCard = ({ title, photo, text, offer, link }) => (
    <Link href={link}>
        <button className="quick-action-card card-shadow">
            { offer != undefined ? <div className="offer">{offer}</div> : null }
            <img src={photo} />
            <h6>{title}</h6>
            <p>{text}</p>
        </button>
    </Link>
);

export default QuickActionCard;