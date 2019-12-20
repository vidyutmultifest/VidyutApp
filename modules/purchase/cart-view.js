import React, {useEffect, useState} from "react";
import CartItem from "../../components/purchase/cartItem";
import PaymentSummaryItem from "../../components/purchase/PaymentSummaryItem";
import Modal from "react-modal";
import dataFetch from "../../utils/dataFetch";
import '../../styles/purchase/cart.sass';
import PayAtCounterQR from "../../components/purchase/payAtCounterQR";
import {useRouter} from "next/router";
const _ = require('lodash');


const CartView = ({ productList, promocode, regID }) => {
    const router = useRouter();
    const [products, setProducts] = useState(productList);
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [showModal, setModal] = useState(false);
    const [vidyutID, setVidyutID] = useState();
    const [status, setStatus] = useState();
    const [orderVars, setOrderVars] = useState();
    const [transactionID, setTransactionID] = useState();

    const vidQuery = `{
      myProfile
      {
        vidyutID
      }
      status
      {
         onlinePayment
         offlinePayment
         promocodes
         referrals
      } 
    }`;

    const getVIDQuery = async () => await dataFetch({ query: vidQuery });

    useEffect(() => {
        if(!isQueried) {
            getVIDQuery().then((response) => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setVidyutID(response.data.myProfile.vidyutID);
                    setStatus(response.data.status);
                    setLoaded(true);
                }
            })
        }
    });

    const promotions = isLoaded ? (
        <div className="promocode-card card-shadow">
            <div className="row m-0">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Enter Promocode</label>
                        <input className="form-control" value={promocode} disabled={!status.promocodes} />
                    </div>
                    { status.promocodes ? <button className="btn btn-primary">Apply</button> : null }
                </div>
            </div>
        </div>
    ) : null;

    const referrals = isLoaded ? (
        <div className="referral-card card-shadow">
            <div className="row m-0">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Enter Referral Code [ VidyutID of Referrer ]</label>
                        <input className="form-control" disabled={!status.referral} />
                    </div>
                    <button className="btn btn-primary">Apply</button>
                </div>
            </div>
        </div>
    ) : null;

    const initiateOrderMutation = `mutation initiateOrder($products:ProductsInput!, $regID: String)
    {
      initiateOrder(products: $products, regID: $regID)
      {
        transactionID
      }
    }`;

    const initiateOrder = async variables => await dataFetch({ query: initiateOrderMutation, variables });

    const createOrder = () => {
        const productsList = [];
        products.map( p => {
           productsList.push({
               "productID": p.productID,
               "qty": p.qty
           })
        });
        const variables = {
            "products": {
                "products": productsList
            },
            "regID": regID ? regID : null
        };
        if(!_.isEqual(orderVars, variables))
        {
            initiateOrder(variables).then((response) => {
                setTransactionID(response.data.initiateOrder.transactionID);
                setOrderVars(variables);
                setLoaded(true);
            })
        }
    };

    const payAtCounter = (
        <Modal
            isOpen={showModal}
            contentLabel="Payment at Counter"
            onRequestClose={() => setModal(false)}
            className="pay-at-counter-modal qr-modal card-shadow"
            overlayClassName="qr-overlay p-2"
        >
            {isLoaded ? <PayAtCounterQR transactionID={transactionID} vidyutID={vidyutID} />
                : null
            }
        </Modal>
    );

    const PayOnline = () => {
        const productsList = [];
        products.map( p => {
            productsList.push({
                "productID": p.productID,
                "qty": p.qty
            })
        });
        const variables = {
            "products": {
                "products": productsList
            },
            "regID": regID ? regID : null
        };
        if(!_.isEqual(orderVars, variables))
        {
            initiateOrder(variables).then((response) => {
                router.push(`/pay/authorize?transactionID=${response.data.initiateOrder.transactionID}`);
            })
        }
    };

    const calcTotalPrice = () => {
        let price = 0;
        products.map(p => price += p.price * p.qty);
        return price;
    };

    const totalPrice = calcTotalPrice();


    const calcGST = (price) => {
        return price * 0.18;
    };

    const handleQtyChange = (pindex, qty) => {
        let newArr = [...products];
        newArr[pindex].qty = qty;
        setProducts(newArr);
    };

    return (
        <div id="cart-view" className="card-shadow">
            <div className="row m-0">
                <div className="col-md-8">
                    <h4>In Your Cart</h4>
                    {
                        products.map((p,i) => (
                            <CartItem
                                photo={p.photo}
                                key={i}
                                qty={p.qty}
                                onChangeQty={(qty) => handleQtyChange(i, qty)}
                                title={p.name}
                                text="No description available"
                                price={`Rs. ${p.price}`}
                                badge={
                                    p.isAmritapurianOnly ?
                                    <div className="badge badge-warning rounded-0">Exclusive for Amritapurians</div> :
                                    p.isFacultyOnly ?
                                    <div className="badge badge-warning rounded-0">Exclusive for Faculty/Industry Personnels</div> :
                                    p.isSchoolOnly ?
                                    <div className="badge badge-warning rounded-0">Exclusive for School Students</div> : null
                                }
                            />
                        ))
                    }
                    <h4 className="mt-4">Apply Promotion</h4>
                    {promotions}
                    <h4 className="mt-4">Apply Referral</h4>
                    {referrals}
                </div>
                <div className="col">
                    <h4>Purchase Summary</h4>
                    <div>
                        <PaymentSummaryItem
                            cartValue={totalPrice - calcGST(totalPrice) - 0}
                            charges={[
                                {
                                    'name': "GST @ 18%",
                                    'price': calcGST(totalPrice)
                                },
                                {
                                    'name': "Internet Handling Fee",
                                    'price': 0
                                },
                            ]}
                            deductions={[
                                {
                                    name : "Promocode - EARLYBIRD",
                                    price: 0
                                }
                            ]}
                        />
                        <div>
                            { isLoaded && status.onlinePayment ? <button onClick={() => { PayOnline(); }} className="payment-button card-shadow">Pay Online</button> : null }
                            { isLoaded && status.offlinePayment ? <button onClick={() => { createOrder(); setModal(true); }} className="payment-button card-shadow">Pay at Counter</button> : null}
                        </div>
                        {payAtCounter}
                    </div>
                </div>
            </div>
        </div>
    )

};

export default CartView;