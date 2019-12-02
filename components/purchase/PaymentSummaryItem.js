import React from "react";

const CartItem = ({ charges, deductions, cartValue }) => {

    const renderCharge = (name, price) => (
        <React.Fragment>
            <div className="col-8 px-0 charge-name">{name}</div>
            <span className="col-4 px-0 charge-amount">+Rs. {price}</span>
        </React.Fragment>
    );
    const renderDeduction = (name, price) => (
        <React.Fragment>
            <div className="col-8 px-0 charge-name">{name}</div>
            {
                price == 0 ?
                    <span className="col-4 px-0 charge-amount">INC.</span>
                    : <span className="col-4 px-0 charge-amount">-Rs. {price}</span>
            }
        </React.Fragment>
    );

    const getTotal = () =>
    {
        let value = cartValue;
        charges.map(c => value+= c.price );
        deductions.map(d => value-= d.price);
        return value;
    };

    return (
        <div className="payment-summary-item">
            <div className="row m-0">
                <div className="col-8 px-0 charge-name">Cart Value</div>
                <span className="col-4 px-0 charge-amount">Rs. {cartValue}</span>
                <div className="col-12 px-0 pt-4 font-weight-bold">Charges</div>
                {charges.map( c => renderCharge(c.name, c.price))}
                {
                    deductions && deductions.length > 0 ?
                        <React.Fragment>
                            <div className="col-12 px-0 pt-4 font-weight-bold">Deductions</div>
                            {deductions.map( c => renderDeduction(c.name, c.price))}
                        </React.Fragment>
                   : null
                }
            </div>
            <div className="total my-4">
                <div>Total</div>
                <div className="total-amount">Rs. {getTotal()}</div>
            </div>
        </div>
    )
};

export default CartItem;