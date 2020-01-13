import React from "react";

const AmritapurianCard = ({ rollNo }) => {

    return (
        <div
            className="card-shadow m-2"
            style={{
                backgroundImage: `url('${require('../../images/aoc/amritapuri_bg.jpeg')}')`,
                backgroundPosition: 'bottom',
                backgroundSize: '100% 200%',
            }}
        >
            <div className="d-flex h-100 align-items-center p-2" style={{ background: 'rgba(0,0,0,0.7)', minHeight: '50vh'}}>
                <div className="p-4 text-light">
                    <div style={{ fontSize: 'calc(1.3rem + 3vw', fontWeight: '900'}}>Insider</div>
                    <p>You have been verified as an Amritapuri Campus student.</p>
                    <div className="font-weight-bold" style={{ fontSize: '1.2rem'}}>{rollNo}</div>
                </div>
            </div>
        </div>
    )

};

export default AmritapurianCard;