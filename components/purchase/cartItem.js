import React from "react";
import "../../styles/purchase/cartItem.sass"

const CartItem = ({ title, photo, text, qty, price, badge, onChangeQty }) => (
    <div className="cart-item card-shadow p-2">
        {photo ? <div><img src={photo} /></div> : null}
        <div>
            <h6 className="mb-0">{title}</h6>
            {badge}
            <span className="sub-text">{text}</span>
            <div className="qty py-2 px-0"><b>Qty:</b>
                <input value={qty} disabled={true} onChange={e => {
                    const val = e.target.value;
                    if(!isNaN(val) && parseInt(val) > 0)
                    {
                        onChangeQty(parseInt(val))
                    }
                }
                } className="d-inline-block mx-2 form-control" /> | <b>Price:</b> {price}
            </div>
        </div>
    </div>
);

export default CartItem;