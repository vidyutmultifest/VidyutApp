import React from "react";
import '../../styles/dashboard/style.sass';

const AgreementCard = ({ content, agreementText, onCheck}) => (
    <div className="agreement-card card-shadow p-4">
        <h4>Event Details</h4>
        <div className="terms-scroller" dangerouslySetInnerHTML={{ __html: content}} />
        <div className="terms-text">
            <input type="checkbox" name="i-agree" />
            {agreementText}
        </div>

    </div>
);

export default AgreementCard;