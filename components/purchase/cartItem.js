import React from "react";
import "../../styles/purchase/cartItem.sass"

const CartItem = ({ title, photo, text, qty, price }) => (
    <div className="cart-item card-shadow p-2">
        {photo ? <div><img src={photo} /></div> : null}
        <div>
            <h6>{title}</h6>
            <span className="sub-text">{text}</span>
            <span className="qty"><b>Qty:</b> {qty} | <b>Price:</b> {price}</span>
        </div>
    </div>
);

export default CartItem;