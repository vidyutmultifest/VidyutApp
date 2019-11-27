import React from "react";
import '../../styles/purchase/cart.sass';
import CartItem from "../../components/purchase/cartItem";
import PaymentSummaryItem from "../../components/purchase/PaymentSummaryItem";

const CartView = () => {

    const promotions = (
        <div className="promocode-card card-shadow">
            <div className="row m-0">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Enter Promocode</label>
                        <input className="form-control" />
                    </div>
                    <button className="btn btn-primary">Apply</button>
                </div>
            </div>
        </div>
    );

    const referrals = (
        <div className="referral-card card-shadow">
            <div className="row m-0">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Enter Referral Code [ VidyutID of Referrer ]</label>
                        <input className="form-control" />
                    </div>
                    <button className="btn btn-primary">Apply</button>
                </div>
            </div>
        </div>
    );

    return (
        <div id="cart-view" className="card-shadow">
            <div className="row m-0">
                <div className="col-md-8">
                    <h4>In Your Cart</h4>
                    <CartItem
                        photo={require('../../images/icons/tickets-qa.png')}
                        qty="1"
                        title="Vidyut 2020 - Proshow Ticket"
                        text="Entry tickets to Vidyut 2020 Proshows"
                        price="Rs. 1000"
                    />
                    <h4 className="mt-4">Apply Promotion</h4>
                    {promotions}
                    <h4 className="mt-4">Apply Referral</h4>
                    {referrals}
                </div>
                <div className="col">
                    <h4>Purchase Summary</h4>
                    <div>
                        <PaymentSummaryItem
                            cartValue={1000}
                            charges={[
                                {
                                    'name': "GST @ 18%",
                                    'price': 180
                                },
                                {
                                    'name': "Internet Handling Fee",
                                    'price': 20
                                },
                            ]}
                            deductions={[
                                {
                                    'name': "Promocode",
                                    'price': 100,
                                }
                            ]}
                        />
                        <div className="fix-bottom">
                            <button className="payment-button card-shadow">Proceed to Pay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default CartView;