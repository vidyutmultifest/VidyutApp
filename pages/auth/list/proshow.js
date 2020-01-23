import React, {useEffect, useState} from "react";
import dataFetch from "../../../utils/dataFetch";
import Base from "../../../components/base";
import Topbar from "../../../components/common/topbar";
import MenuBar from "../../../components/common/menubar";
import BottomBar from "../../../components/common/bottombar";
import '../../../styles/bootstrap.sass';

const ProshowList = () => {
    const [isQueried, setQueried] = useState(false);
    const [data, setData] = useState(false);

    const query = `{
      viewTicketSaleCount
      {
        name
        total
        online
        offline
        insider
        insiderOnline
        outsider
        outsiderOnline
      }
    }`;

    const getStats = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried) {
            getStats().then((response) =>{
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.viewTicketSaleCount);
                }
            })
        }
    });

    const renderStatCard = (d) => (
        <div className="col-md-4 p-2">
            <div className="card-shadow p-2">
                <div className="font-weight-bold mb-2">{d.name}</div>
                <ul>
                    <li>Total : {d.total}</li>
                    <li>Insider : {d.insider} [ {d.insiderOnline} online]</li>
                    <li>Outsider: {d.outsider} [ {d.outsiderOnline} online]</li>
                </ul>
            </div>
        </div>
    );

    return <Base adminRequired>
        <Topbar />
        <MenuBar />
        <div className="container p-2">
            <h1>Proshow Ticket Sale</h1>
            <div className="row m-0">
                {
                    data && data.length > 0 ?
                        data.map(d => renderStatCard(d))
                        : null
                }
            </div>
        </div>
        <BottomBar
            currentTabIcon={require('../../../images/icons/feed-icon.png')}
            currentTabName="Stat"
        />
    </Base>

};

export default ProshowList;