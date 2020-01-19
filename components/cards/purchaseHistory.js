import React, {useEffect, useState} from "react";
import dataFetch from "../../utils/dataFetch";
import PurchasedItem from "../dashboard/purchasedItem";

const PurchaseHistory = () => {
    const [isQueried, setQueried] = useState(false);
    const [data, setData] = useState(false);

    const query = `{
      myOrders
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
                }
            })
        }
    });

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

    return (
        <div>
            { data ? data.map(d => <div className="card-shadow p-2">{Purchases(d)}</div>) : null }
        </div>
    )
};

export default PurchaseHistory;