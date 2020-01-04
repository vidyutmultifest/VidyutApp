import React, {useEffect, useState} from "react";
import '../../styles/dashboard/registrationoverview.sass'
import dataFetch from "../../utils/dataFetch";
import PurchasedItem from "../../components/dashboard/purchasedItem";
import QuickListCard from "../../components/dashboard/QuickListCard";

const MyPurchases = () => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState();

    const query = `{
      myOrders(limit: 5)
      {
        orderID
        timestamp
        products
        {
          name
          price
          qty
        }
        transaction
        {
            transactionID
            timestamp
            amount
            isPaid
            isPending
            isProcessed
            isOnline
            transactionData
            issuer
            {
              firstName
            }
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
        <div className="not-registered-prompt text-center p-4">
            <img src={require('../../images/icons/sad.png')} />
            <h6>Nothing Found</h6>
            <div>
                You have not <i>yet</i> registered for any events.
                But you surely can take the time to explore all the cool stuff happening at Vidyut.
            </div>
            <button className="btn mt-4 btn-primary">Explore Vidyut</button>
        </div>
    );

    const Purchases = o => (
        <PurchasedItem
            orderID={o.orderID}
            transactionID={o.transaction ? o.transaction.transactionID : null}
            isPaid={o.transaction ? o.transaction.isPaid : null}
            amount={o.transaction ? o.transaction.amount : null}
            transaction={o.transaction}
            handleRefresh={() => setQueried(false)}
            status={
                o.transaction ?
                    o.transaction.isPaid ?
                        <div className="badge badge-success">Paid</div>
                        : o.transaction.isPending ?
                            <div className="badge badge-warning">Pending</div>
                            : <div className="badge badge-danger">Failed</div>
                : <div className="badge badge-danger">No Transaction for Order</div>
            }
            timestamp={o.timestamp}
            products={o.products}
            issuer={o.transaction && o.transaction.issuer ? o.transaction.issuer.firstName : null}
        />
    );

    return isLoaded ?
        <QuickListCard
            items={data.length > 0 ? [data.map(d => Purchases(d))] : []}
            title="My Purchase History"
            renderWhenEmpty={NotRegistered}
            showMoreButton={{
                    "link": "/payment/view-orders",
                    "text": "View All Orders"
            }}
        /> : null;
};

export default MyPurchases