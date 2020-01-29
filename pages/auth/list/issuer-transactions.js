import React, {useState} from "react";
import Base from "../../../components/base";
import Topbar from "../../../components/common/topbar";
import MenuBar from "../../../components/common/menubar";
import BottomBar from "../../../components/common/bottombar";
import dataFetch from "../../../utils/dataFetch";
import moment from "moment";

import '../../../styles/bootstrap.sass';
import Head from "next/head";

const IssuerTransactions = () => {

    const query = `query getTransaction($vid: String!){
      getTransactionsApproved(vid: $vid)
      {
        transactionID
        amount
        timestamp
        user { 
            firstName  
            lastName
            vidyutID
        }
        products
        {
          name
        }
      }
    }`;

    const getTrans = async variables => await dataFetch({ query, variables });


    const [vid, setVID] = useState(false);
    const [data, setData] = useState(false);

    const handleSearch = () => {
        getTrans({ vid }).then(response => {
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                setData(response.data.getTransactionsApproved);
            }
        })
    };

    const renderTransTable = () => (
        <div className="card-shadow p-2" style={{ overflow: 'auto' }}>
            <table className="table">
                <thead>
                <th>User</th>
                <th>Amount</th>
                <th>Product</th>
                <th>Time</th>
                <th>Trans #</th>
                </thead>
                {
                    data ?
                        <tr className="font-weight-bold">
                            <td scope="col">Total</td>
                            <td scope="col">{_.sumBy(data, function(o) { return parseInt(o.amount); })}</td>
                            <td scope="col">~</td>
                            <td scope="col">~</td>
                            <td scope="col">~</td>
                            <td scope="col">~</td>
                        </tr> : null
                }
                {
                    data && data.length > 0?
                        data.map(i =>
                            <tr>
                                <td>{i.user.firstName} {i.user.lastName} ({i.user.vidyutID})</td>
                                <td>{i.amount}</td>
                                <td>{i.products[0].name}</td>
                                <td>{moment(i.timestamp).format('DD/MM/YY - hh:mm a')}</td>
                                <td>{i.transactionID}</td>
                            </tr>
                        ) : null
                }
            </table>
        </div>
    );

    const renderSearch = () => (
        <div className="card-shadow p-2">
            <div className="form-group">
                <label>Enter Vidyut ID</label>
                <input
                    className="form-control"
                    value={vid ? vid : null}
                    onChange={(e) => setVID(e.target.value)}
                    placeholder="Enter Vidyut ID"
                />
            </div>
            <button
                onClick={handleSearch}
                className="btn btn-primary px-4 py-2"
            >
                View Transactions
            </button>
        </div>
    );

    return <Base loginRequired>
        <Head>
            <title>Issuer Transaction List | Vidyut 2020 | National Level Multifest</title>
        </Head>
        <Topbar/>
        <MenuBar/>
        <div className="container my-2">
            <h1 className="mb-4">Issuer Transactions List</h1>
            { data ? renderTransTable() : renderSearch() }
        </div>
        <BottomBar
            hideExploreTab
            currentTabIcon={require('../../../images/icons/dashboard-bottom-bar-icon.png')}
            currentTabName="List"
        />
    </Base>

};

export default IssuerTransactions;