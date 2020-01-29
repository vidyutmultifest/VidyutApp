import React, {useEffect, useState} from "react";
import dataFetch from "../../../utils/dataFetch";
import Base from "../../../components/base";
import Head from "next/head";
import Topbar from "../../../components/common/topbar";
import MenuBar from "../../../components/common/menubar";
import '../../../styles/bootstrap.sass';
import BottomBar from "../../../components/common/bottombar";
const _ = require('lodash');


const WorkshopStatsList = () => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);

    const query = `
    {
      getWorkshopStats
      {
        name
        slots
        totalRegs
        pulse
        paidRegs
        pulsePaid
        unpaidRegs
        insiderPaid
        outsiderPaid
      }
    }`;

    const getStats = async () => await dataFetch({ query });

    const sortedList = (r) => {
        return _.sortBy(r, [function(o) { return o.paidRegs; }]);
    };

    useEffect(() => {
        if(!isQueried)
        {
            getStats().then((response) =>{
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.getWorkshopStats);
                    setLoaded(true)
                }
            })
        }
    });

    const renderWorkshop = (r) => (
        <tr>
            <td>{r.name}</td>
            <td>{r.totalRegs} {r.pulse > 0 ? `(+${r.pulse})` : null}</td>
            <td><b>{r.paidRegs} {r.pulsePaid > 0 ? `(+${r.pulsePaid})`: null}</b></td>
            <td>{r.slots > 0 ? `${r.slots - r.paidRegs}/${r.slots}` : '~'} </td>
            <td>{r.unpaidRegs}</td>
            <td>{r.insiderPaid}</td>
            <td>{r.outsiderPaid}</td>
        </tr>
    );

    return <Base loginRequired>
        <Head>
            <title>Workshop Stats | Vidyut 2020</title>
        </Head>
        <Topbar/>
        <MenuBar/>
        <div className="container p-0">
            <h2>Workshop Statistics</h2>
            <div className="alert-info alert my-2 p-2">
                <p>Please view in desktop-mode.</p>
            </div>
            <div className="card-shadow" style={{ overflow: 'auto' }}>
                <table className="table">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Total Regs</th>
                    <th scope="col">Paid Regs</th>
                    <th scope="col">Slots Remaining</th>
                    <th scope="col">Unpaid Regs</th>
                    <th scope="col">Insider Paid</th>
                    <th scope="col">Outsider Paid</th>
                </tr>
                </thead>
                {
                    isLoaded ?
                        <tr className="font-weight-bold">
                            <td scope="col">Total</td>
                            <td scope="col">{_.sumBy(data, 'totalRegs')}</td>
                            <td scope="col">{_.sumBy(data, 'paidRegs')}</td>
                            <td scope="col">{_.sumBy(data, 'slots') - _.sumBy(data, 'paidRegs')}/{_.sumBy(data, 'slots')}</td>
                            <td scope="col">{_.sumBy(data, 'unpaidRegs')}</td>
                            <td scope="col">{_.sumBy(data, 'insiderPaid')}</td>
                            <td scope="col">{_.sumBy(data, 'outsiderPaid')}</td>
                        </tr> : null
                }
                {
                    isLoaded ?
                        sortedList(data).reverse().map(w => renderWorkshop(w))
                        : null
                }
            </table>
            </div>
        </div>
        <BottomBar
            currentTabIcon={require('../../../images/icons/dashboard-bottom-bar-icon.png')}
            currentTabName="List"
            hideExploreTab
        />
    </Base>


};

export default WorkshopStatsList;