import React from "react";
import "../../styles/purchase/cartItem.sass"

const CartItem = ({ title, photo, text, qty, price, badge, onChangeQty, isAvailable }) => (
    <div className="cart-item card-shadow p-2">
        {photo ? <div><img src={photo} /></div> : null}
        <div className="w-100">
            <h6 className="mb-0">{title}</h6>
            <span className="sub-text">{text}</span>
            {isAvailable ? badge : null}
            {
                isAvailable ? (
                    <div className="d-flex p-0 w-100 m-0">
                        <div className="qty py-2  w-100 px-0">
                            <b>Qty:</b>
                            <input value={qty} disabled={true} onChange={e => {
                                const val = e.target.value;
                                if(!isNaN(val) && parseInt(val) > 0)
                                {
                                    onChangeQty(parseInt(val))
                                }
                            }
                            } className="d-inline-block text-center mx-2 form-control" />
                            | <b>Price:</b> {price}
                        </div>
                    </div>
                ) : null
            }

        </div>
    </div>
);

export default CartItem;