import React from "react";

const CartItem = ({ title, photo, text, qty, price }) => (
    <div className="cart-item card-shadow p-2">
        <div><img src={photo} /></div>
        <div>
            <h6>{title}</h6>
            <span className="sub-text">{text}</span>
            <span className="qty"><b>Qty:</b> {qty} | <b>Price:</b> {price}</span>
        </div>
    </div>
);

export default CartItem;