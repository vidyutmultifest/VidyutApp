import React, {useEffect, useState} from "react";
import '../../styles/dashboard/registrationoverview.sass'
import dataFetch from "../../utils/dataFetch";
import PurchasedItem from "../../components/dashboard/purchasedItem";

const MyPurchases = () => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState();

    const query = `{
      myOrders
      {
        orderID
        timestamp
        products
        {
          product
          {
            name
          }
        }
        transaction
        {
          transactionID
          timestamp
          amount
        }
      }
    }`;

    const getMyPurchases = async () => await dataFetch({ query });


    useEffect(() => {
        if(!isQueried)
        {
            getMyPurchases().then((response) =>{
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.myOrders);
                    setLoaded(true);
                }
            })
        }
    });

    const NotRegistered = (
        <div className="not-registered-prompt">
            <img src={require('../../images/icons/sad.png')} />
            <h6>Nothing Found</h6>
            <div>
                You have not <i>yet</i> registered for any events.
                But you surely can take the time to explore all the cool stuff happening at Vidyut.
            </div>
            <button className="btn btn-primary">Explore Vidyut</button>
        </div>
    );

    const Purchases = o => (
        <PurchasedItem
            orderID={o.orderID}
            amount={o.transaction.amount}
            timestamp={o.timestamp}
            products={o.products}
        />
    );

    return (
        <div id="dashboard-registrations-overview" className="card-shadow">
            <div className="title-area">
                <h4>My Purchases</h4>
            </div>
            <div className="content-area">
            {
                isLoaded ?
                        data.length > 0 ?
                            data.map(d => Purchases(d))
                            : NotRegistered
                    : null
            }
            </div>
        </div>
    )
};

export default MyPurchases