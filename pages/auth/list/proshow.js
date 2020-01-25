import React, {useEffect, useState} from "react";
import dataFetch from "../../../utils/dataFetch";
import Base from "../../../components/base";
import Topbar from "../../../components/common/topbar";
import MenuBar from "../../../components/common/menubar";
import BottomBar from "../../../components/common/bottombar";
import '../../../styles/bootstrap.sass';
import Head from "next/head";

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

    const renderTotalStatCard = (data) => {
       let totalSale = 0;
       let totalInsider = 0;
       let totalOutsider = 0;
       let totalInsiderOnline = 0;
       let totalOutsiderOnline = 0;
       for(let i=0; i<data.length; i++)
       {
           totalSale += data[i].total;
           totalInsider += data[i].insider;
           totalOutsider += data[i].outsider;
           totalInsiderOnline += data[i].insiderOnline;
           totalOutsiderOnline += data[i].outsiderOnline;
       }
       return (
           <div className="col-md-4 p-2">
               <div className="card-shadow p-2">
                   <div className="font-weight-bold mb-2">Proshow Ticket Sale Total</div>
                   <ul>
                       <li>Total : {totalSale}</li>
                       <li>Insider : {totalInsider} [ {totalInsiderOnline} online]</li>
                       <li>Outsider: {totalOutsider} [ {totalOutsiderOnline} online]</li>
                   </ul>
               </div>
           </div>
       )
    };

    return <Base loginRequired>
        <Head>
            <title>Proshow Ticket Sale Statistics | Vidyut 2020 | National Level Multifest</title>
        </Head>
        <Topbar />
        <MenuBar />
        <div className="container p-2">
            <h1>Proshow Ticket Sale</h1>
            <div className="row m-0">
                { data && data.length > 0 ? renderTotalStatCard(data) : 0 }
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