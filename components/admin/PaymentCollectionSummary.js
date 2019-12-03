import React from "react";
import "../../styles/admin/payment-collection-summary.sass"

const PaymentCollectionSummary = ({ amount, transactionCount, pendingCount }) => (
    <div className="payment-collection-summary card-shadow p-0">
        <div className="header-area">
            <h4>Payment Collection Summary</h4>
        </div>
        <div className="p-3">
            <li><b>Total # of Successful Transactions</b>: { transactionCount }</li>
            <li><b>Total # of Pending Transactions</b>: { pendingCount }</li>
            <li><b>Total Amount Collected:</b> Rs. {amount}</li>
        </div>
    </div>
);

export default PaymentCollectionSummary;