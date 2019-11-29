import React, {useEffect, useState} from "react";
import '../../styles/purchase/cart.sass';
import CartItem from "../../components/purchase/cartItem";
import PaymentSummaryItem from "../../components/purchase/PaymentSummaryItem";
import Modal from "react-modal";
import QRCode from "qrcode.react";
import dataFetch from "../../utils/dataFetch";

const CartView = ({ products }) => {

    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [showModal, setModal] = useState(false);
    const [vidyutID, setVidyutID] = useState();
    const [transactionID, setTransactionID] = useState();

    const vidQuery = `{
      myProfile
      {
        vidyutID
       }
    }`;

    const getVIDQuery = async () => await dataFetch({ query: vidQuery });

    useEffect(() => {
        if(!isQueried) {
            getVIDQuery().then((response) => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setVidyutID(response.data.myProfile.vidyutID);
                    setLoaded(true);
                }
            })
        }
    });

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

    const initiateOrderMutation = `mutation initiateOrder($products:ProductsInput!)
    {
      initiateOrder(products: $products)
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
        console.log(productsList);
        const variables = {
            "products": {
                "products": productsList
            }
        };
        initiateOrder(variables).then((response) => {
            setTransactionID(response.data.initiateOrder.transactionID);
            setLoaded(true);
        })
    };

    const payAtCounter = (
        <Modal
            isOpen={showModal}
            contentLabel="Payment at Counter"
            onRequestClose={() => setModal(false)}
            className="qr-modal"
            overlayClassName="qr-overlay"
        >
            {isLoaded ? <div>
                    <h4>Show at Counter</h4>
                    <div>VIDYUT ID: {vidyutID}</div>
                    { transactionID ? <QRCode value={transactionID} size={256}/> : null }
                    <sub>{transactionID}</sub>
                </div>
                : null
            }
        </Modal>
    );

    const calcTotalPrice = () => {
        let price = 0;
        products.map(p => price += p.price);
        return price;
    };

    const totalPrice = calcTotalPrice();


    const calcGST = (price) => {
        return price * 0.18;
    };

    return (
        <div id="cart-view" className="card-shadow">
            <div className="row m-0">
                <div className="col-md-8">
                    <h4>In Your Cart</h4>
                    {
                        products.map(p => (
                            <CartItem
                                photo={p.photo}
                                qty={p.qty}
                                title={p.name}
                                text="No description available"
                                price={`Rs. ${p.price}`}
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
                            cartValue={totalPrice - calcGST(totalPrice) - 20}
                            charges={[
                                {
                                    'name': "GST @ 18%",
                                    'price': calcGST(totalPrice)
                                },
                                {
                                    'name': "Internet Handling Fee",
                                    'price': 20
                                },
                            ]}
                            deductions={[]}
                        />
                        <div className="fix-bottom">
                            <button className="payment-button card-shadow">Pay Online</button>
                            <button onClick={() => { createOrder(); setModal(true); }} className="payment-button card-shadow">Pay at Counter</button>
                        </div>
                        {payAtCounter}
                    </div>
                </div>
            </div>
        </div>
    )

};

export default CartView;