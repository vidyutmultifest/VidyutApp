import React from "react";
import ContentCard from "../events/contentCard";
import dataFetch from "../../utils/dataFetch";

const RegProfileCard = ({ profile, transaction , formData, showTransactionDetails, regID, timestamp }) => {

    const getStatus = `query getStatus($transactionID: String){
      getOnlinePaymentStatus(transactionID: $transactionID)
      {
        status
        data
      }
    }`;

    const getStatusData = async variables => await dataFetch({ query: getStatus, variables });

    const handleRefetch = () => {
        setLoading(true);
        getStatusData({transactionID}).then((response) => {
            setLoading(false);
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                return response
            }
        })
    };

    const getFormData = (form) => {
        if(form && form !== null && form !== "false")
            try {
                return JSON.parse(form.replace(/'/g, '"'));
            } catch (e) {
                return []
            }
    };


    return <ContentCard
        classNames="bg-light text-dark"
        title={<div>
            <h6>{profile.firstName} {profile.lastName}</h6>
            { profile.isAmritapurian ? <div className="badge p-2 text-light mr-2" style={{ backgroundColor: '#a4123f' }}>Insider</div> : null }
            {
                showTransactionDetails ?
                    transaction ?
                        transaction.isPaid ? <div className="badge badge-success p-2">Paid</div>
                            : !transaction.isProcessed ?
                            <div className="badge badge-warning mr-2 p-2">Not Processed</div>
                            : <div className="badge badge-danger mr-2 p-2">Failed</div>
                        : <div className="badge badge-secondary mr-2 p-2">Not Attempted</div>
                    : null
            }
        </div>
        }
        node={
            <div>
                <div className="alert alert-secondary my-2">
                    <div className="font-weight-bold mb-2">Participant Profile</div>
                    <div className="small-text" style={{ lineHeight: '1.35'}}>
                        <div>
                            {regID ? <React.Fragment><b>Reg #</b>: {regID}</React.Fragment> : null}
                        </div>
                        <div>
                            <b>Vidyut ID</b>: {profile.vidyutID}
                        </div>
                        <div>
                            <b>Timestamp</b>: {timestamp}
                        </div>
                        <div>
                            <img src={require('../../images/icons/university.png')} style={{ width: '32px' }} />
                            {profile.college ? profile.college.name : "n/a"}
                        </div>
                        <div>
                            <img src={require('../../images/icons/email.png')} style={{ width: '32px' }} />
                            {profile.email ? profile.email : "n/a"}
                        </div>
                        <div>
                            <img src={require('../../images/icons/ringing-phone.png')} style={{ width: '32px' }} />
                            {profile.phone ? profile.phone : "n/a"}
                        </div>
                    </div>
                </div>
                {
                    showTransactionDetails ?
                        <div className="alert alert-secondary my-2">
                            <div className="mb-2 font-weight-bold">Transaction Details</div>
                            <div className="small-text" style={{ lineHeight: '1.5'}}>
                                <div><b>Status </b>: {
                                    transaction ?
                                        transaction.isPaid ? 'Successful'
                                            : !transaction.isProcessed ? 'Pending'
                                            : 'Failed'
                                        : 'Unattempted'
                                }</div>
                                <div><b>Transaction # </b>: {transaction ? transaction.transactionID : 'n/a'}</div>
                                <div><b>Amount</b> : Rs.{transaction ? `Rs. ${transaction.amount}` : 'n/a'}</div>
                            </div>
                        </div> : null
                }
                {
                   formData ? getFormData(formData) && getFormData(formData).length > 0 ?
                        <div className="alert alert-secondary">
                            <div className="font-weight-bold mb-2">Form Data</div>
                            <div className="small-text" style={{ lineHeight: '1.35'}}>
                                {
                                    getFormData(formData).map(f => <div className="pt-2">
                                        <div className="font-weight-bold pb-2">{f.label}</div>
                                        <div>{f.value ? f.value : 'no response'}</div>
                                    </div>)
                                }
                            </div>
                        </div> : null : null
                }
            </div>
        }
    />
};

export default RegProfileCard;
