import React from "react";
import "../../styles/purchase/cartItem.sass"

const CartItem = ({ title, photo, text, qty, price, badge, onChangeQty, isAvailable }) => (
    <div className="cart-item card-shadow p-2">
        {photo ? <div><img src={photo} /></div> : null}
        <div>
            <h6 className="mb-0">{title}</h6>
            {isAvailable ? badge :
                <div className="mt-2 p-0">
                    <div className="badge badge-danger d-inline rounded-0">Unavailable right now</div>
                </div>
            }
            {
                isAvailable ? (
                    <React.Fragment>
                        <span className="sub-text">{text}</span>
                        <div className="qty py-2 px-0"><b>Qty:</b>
                            <input value={qty} disabled={true} onChange={e => {
                                const val = e.target.value;
                                if(!isNaN(val) && parseInt(val) > 0)
                                {
                                    onChangeQty(parseInt(val))
                                }
                            }
                            } className="d-inline-block mx-2 form-control" /> | <b>Price:</b> {parseInt(price) ? parseInt(price) : price}
                        </div>
                    </React.Fragment>
                ) : null
            }

        </div>
    </div>
);

export default CartItem;