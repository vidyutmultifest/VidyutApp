import React from "react";

const HorizontalSlider = ({ items }) => {

    return (
        <div className="d-flex" style={{ overflowX: 'auto' }}>
            {
                items && items.length > 0 ?
                    items.map((item,i) =>
                        <div key={`slide-${i}`} className="col-9 col-sm-6 col-md-3 p-2">
                            {item}
                        </div>
                    )
                    : null
            }
        </div>
    )
};

export default HorizontalSlider;