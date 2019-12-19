import React, {useEffect, useState} from "react";
import Base from "../../../components/base";
import Head from "next/head";
import TitleBar from "../../../components/titleBar";
import AdminRequired from "../../../components/adminRequired";
import dataFetch from "../../../utils/dataFetch";
import LoadingScreen from "../../../components/loadingScreen";
import { ResponsiveLine } from '@nivo/line'

import '../../../styles/admin/stats-card.sass';

const TransactionStats = () => {
    const [isQueried, setQueried] = useState(false);
    const [data, setData] = useState(false);
    const [isLoaded, setLoaded] = useState(false);

    const query = `{
      getTransactionStats
      {
        totalAmount
        totalTransactions
        totalPendingTransactions
        totalSuccessfulTransactions
        totalCustomers
        totalIssuers
        totalProductsSold
        today: dailyStats
        {
          totalAmount
          totalSuccessfulTransactions
          totalPendingTransactions
        }
         weeklyStats: dailyStats(startDate: "2019-12-05", endDate: "2019-12-11"){
          x: date
          y: totalAmount
        }
      }
    }`;

    const getTransactionDetails = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried)
        {
            getTransactionDetails().then((response) => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.getTransactionStats);
                    setLoaded(true);
                }
            })
        }
    });

    const renderOverallStatistics = () => (
        <div className="row m-0">
            <div className="col-md-3 p-2">
                <div className="stats-card h-100 card-shadow p-4">
                    <div className="stat">₹{data.totalAmount}</div>
                    <h6>Amount Collected</h6>
                </div>
            </div>
            <div className="col-md-3 p-2">
                <div className="stats-card h-100 card-shadow p-4">
                    <div className="stat">{data.totalSuccessfulTransactions}</div>
                    <h6>Successful Transactions</h6>
                </div>
            </div>
            <div className="col-md-3 p-2">
                <div className="stats-card h-100 card-shadow p-4">
                    <div className="stat">{data.totalPendingTransactions}</div>
                    <h6>Pending Transactions</h6>
                </div>
            </div>
            <div className="col-md-3 p-2">
                <div className="stats-card h-100 card-shadow p-4">
                    <div className="stat">{data.totalCustomers}</div>
                    <h6>Paid Users</h6>
                </div>
            </div>
            <div className="col-md-3 p-2">
                <div className="stats-card h-100 card-shadow p-4">
                    <div className="stat">{data.totalIssuers}</div>
                    <h6>Issuing Volunteers</h6>
                </div>
            </div>
            <div className="col-md-3 p-2">
                <div className="stats-card h-100 card-shadow p-4">
                    <div className="stat">{data.totalProductsSold}</div>
                    <h6>Products Sold</h6>
                </div>
            </div>
            <div className="col-md-3 p-2">
                <div className="stats-card h-100 card-shadow p-4">
                    <div className="stat">
                        {(data.totalSuccessfulTransactions/data.totalTransactions).toPrecision(4)*100}%
                    </div>
                    <h6>Success Percentage</h6>
                </div>
            </div>
        </div>
    );

    const renderTodaysStatistics = () => (
        <div className="row m-0">
            <div className="col-md-3 p-2">
                <div className="stats-card h-100 card-shadow p-4">
                    <div className="stat">
                        ₹{data.today[0].totalAmount ? data.today[0].totalAmount : 0}
                    </div>
                    <h6>Amount Collected</h6>
                </div>
            </div>
            <div className="col-md-3 p-2">
                <div className="stats-card h-100 card-shadow p-4">
                    <div className="stat">
                        {data.today[0].totalSuccessfulTransactions}
                    </div>
                    <h6>Total Successful Transactions</h6>
                </div>
            </div>
        </div>
    );

    const renderWeeklyGraph = () => (
        <div className="card-shadow p-4">
            <h4>Weekly Sales Overview</h4>
            <div style={{height: 300, width: '95%'}}>
            <ResponsiveLine
                // xScale={{
                //     format: "%Y-%m-%d",
                // }}
                useMesh={true}
                margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
                // xFormat="time:%dh"
                // axisLeft={{
                //     orient: "left",
                //     format: "%d",
                //     legend: "Date",
                //     legendOffset: -80,
                //     legendPosition: "middle"
                // }}
                data={[
                    {
                        "id": "weekly-stats",
                        "data": data.weeklyStats
                    }
                ]}
            />
            </div>
        </div>
    );

    return <Base loginRequired>
        <Head>
            <title>Transaction Stats | Admin | Vidyut 2020</title>
        </Head>
        <AdminRequired>
        {
            isLoaded ?
                <React.Fragment>
                    <TitleBar/>
                    <div className="container my-4">
                        <div className="py-2">
                            <h4>Overall Statistics</h4>
                            {renderOverallStatistics()}
                        </div>
                        <div className="py-2">
                            <h4>Today's Statistics</h4>
                            {renderTodaysStatistics()}
                        </div>
                        <div className="row m-0">
                            <div className="col-md-6 p-2">
                                {renderWeeklyGraph()}
                            </div>
                        </div>
                    </div>
                </React.Fragment> : <LoadingScreen text="Loading Stats" />
        }
        </AdminRequired>
    </Base>

};

export default TransactionStats;