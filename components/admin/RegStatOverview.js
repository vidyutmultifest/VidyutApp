import React, {useEffect, useState} from "react";
import dataFetch from "../../utils/CustomdDataFetch";

const RegStatOverview = () => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);
    const [amountData, setAmountData] = useState(false);

    const query = `{
      registrationCount
      {
        total
        paid
        workshop
        workshopPaid
        competition
        competitionPaid
        insider
        outsider
        insiderPaid
        outsiderPaid
        onlinePaid
        offlinePaid
      }
      registrationAmount
      {
        total
        online
        offline
      }
    }`;

    const getStats = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried)
        {
            getStats().then(  response => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.registrationCount);
                    setAmountData(response.data.registrationAmount);
                    setLoaded(true);
                }
            })
        }
    });

    return isLoaded ? (
        <div className="row m-0">
            <div className="col-12 p-2">
                <h4 className="my-4">Overall Statistics</h4>
            </div>
            <div className="col-md-4 p-1 col-6">
                <div className="card-shadow p-2 h-100">
                    <h3><span className="text-success">{data.paid}</span> / {data.total}</h3>
                    <h6>Total</h6>
                </div>
            </div>
            <div className="col-md-4 p-1 col-6">
                <div className="card-shadow p-2 h-100">
                    <h3><span className="text-success">{data.workshopPaid}</span> / {data.workshop}</h3>
                    <h6>Workshop</h6>
                </div>
            </div>
            <div className="col-md-4 p-1 col-6">
                <div className="card-shadow p-2 h-100">
                    <h3><span className="text-success">{data.competitionPaid}</span> / {data.competition}</h3>
                    <h6>Competition</h6>
                </div>
            </div>
            <div className="col-md-4 p-1 col-6">
                <div className="card-shadow p-2 h-100">
                    <h3><span className="text-success">{data.insiderPaid}</span> / {data.insider}</h3>
                    <h6>Insiders</h6>
                </div>
            </div>
            <div className="col-md-4 p-1 col-6">
                <div className="card-shadow p-2 h-100">
                    <h3><span className="text-success">{data.outsiderPaid}</span> / {data.outsider}</h3>
                    <h6>Outsiders</h6>
                </div>
            </div>
            <div className="col-md-4 p-1 col-6">
                <div className="card-shadow p-2 h-100">
                    <h3>{data.onlinePaid} / {data.offlinePaid}</h3>
                    <h6>Online/Offline Paid</h6>
                </div>
            </div>
            <div className="col-md-4 p-1 col-6">
                <div className="card-shadow p-2 h-100">
                    <h3>Rs. {amountData.total}</h3>
                    <h6>Total Amount Collected</h6>
                </div>
            </div>
            <div className="col-md-4 p-1 col-6">
                <div className="card-shadow p-2 h-100">
                    <h3>Rs. {amountData.online}</h3>
                    <h6>Amount Collected Online</h6>
                </div>
            </div>
            <div className="col-md-4 p-1 col-6">
                <div className="card-shadow p-2 h-100">
                    <h3>Rs. {amountData.offline}</h3>
                    <h6>Amount Collected Offline</h6>
                </div>
            </div>
        </div>
    ) : null

};

export default RegStatOverview;