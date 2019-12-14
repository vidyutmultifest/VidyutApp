import React from "react";
import Link from "next/link";
import Card from "./Card";

const QuickActionCard = ({ title, items, showMoreButton, renderWhenEmpty }) => {
    return (
        <Card
            title={title}
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