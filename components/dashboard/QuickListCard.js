import React from "react";
const shortid = require('shortid');
import Link from "next/link";
import Card from "./Card";

const QuickActionCard = ({ title, items, showMoreButton, renderWhenEmpty, key }) => {
    return (
        <Card
            title={title}
            key={key}
            content={
                items && items.length > 0 ?
                    <div className="mb-2">{items.map(i => i)}</div>
                    : renderWhenEmpty
            }
            footer={showMoreButton ?
                <Link href={showMoreButton.link}>
                    <button className="btn btn-primary">
                        {showMoreButton.text}
                    </button>
                </Link> : null
            }
        />
    );
};

export default QuickActionCard;