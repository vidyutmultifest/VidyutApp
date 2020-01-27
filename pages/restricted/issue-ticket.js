import React, {useState} from "react";
import Base from "../../components/base";
import Topbar from "../../components/common/topbar";
import MenuBar from "../../components/common/menubar";
import BottomBar from "../../components/common/bottombar";
import dynamic from "next/dynamic";
import NoSSR from "../../components/noSSR";
import dataFetch from "../../utils/dataFetch";
import Head from "next/head";

const IssueTicket = () => {
    const [qrScanned, setQrScanned] = useState(false);
    const [ticketData, setTicketData] = useState(false);
    const [ticketNo, setTicketNo] = useState(false);
    const [userHash, setUserHash] = useState(false);
    const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false});

    const checkTicketQuery = `query checkForTicket($hash: String!){
      checkForTicket(hash: $hash)
      {
        status
        message
        productName
        userName
        rollNo
        photo
        tShirtSize
        isProfileComplete
      }
    }`;

    const issueTicketMutation = `mutation issueTicket($number: String!, $hash: String!)
    {
      issueTicket(number: $number, vidyutHash: $hash)
      {
        status
        message
      }
    }`;

    const checkForTicket = async variables => await dataFetch({ query: checkTicketQuery, variables });
    const issueTicket = async variables => await dataFetch({ query: issueTicketMutation, variables });

    const handleCheckForTicket = (data) => {
       checkForTicket({
           hash: data
       }).then( response => {
           setTicketData(response.data.checkForTicket);
       })
    };


    const handleScan = data => {
        if(data!=null)
        {
            setQrScanned(true);
            setUserHash(data);
            handleCheckForTicket(data);
        }
    };

    const [isIssuingTicket, setIssuingTicket] = useState(false);
    const [issueData, setIssueData] = useState(false);
    const handleIssueTicket = () => {
        if(ticketNo.length>3)
        {
            setIssuingTicket(true);
            issueTicket({
                number: ticketNo,
                hash: userHash
            }).then(response => {
                setIssuingTicket(false);
                setIssueData(response.data.issueTicket);
            })
        }
    };

    return <Base loginRequired>
        <Head>
            <title>Issue Physical Tickets - Volunteer Page | Vidyut 2020 | National Level Multifest</title>
        </Head>
        <Topbar/>
        <MenuBar/>
            <div className="d-flex justify-content-center align-items-center bg-dark w-100" style={{ minHeight: '80vh'}}>
                {
                    issueData ?
                        <div className="card-shadow p-2">
                            <div>{issueData.message}</div>
                            <div
                                onClick={() => { setIssueData(false); setQrScanned(false); }}
                                className="btn btn-success"
                            >Scan Another</div>
                        </div>
                    : isIssuingTicket ?
                        <div className="card-shadow p-2">Issuing Ticket</div>
                    : !qrScanned ?
                        <NoSSR>
                            <QrReader
                                delay={300}
                                onScan={handleScan}
                                onError={(e) => console.log(e)}
                                facingMode="environment"
                                style={{width: '90vw', maxWidth: "400px"}}
                            />
                        </NoSSR> :
                        ticketData ? <div className="card-shadow text-left">
                            <div className="row m-0">
                                {
                                    ticketData.photo ?
                                        <div
                                            className="col-md-4 p-0"
                                             style={{
                                                maxHeight: '30vh',
                                                backgroundImage: `url("${ticketData.photo}")`,
                                                backgroundSize: 'contain',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                minHeight: '180px'
                                            }}
                                        /> : null
                                }
                                <div className="col p-2">
                                    <h5 className={ticketData.status ? "text-success mb-0" : "text-danger mb-0"}>{ticketData.message}</h5>
                                    <div className="py-1">
                                        <div><b>Name:</b> {ticketData.userName}</div>
                                        <div><b>Roll No:</b> {ticketData.rollNo}</div>
                                        <div><b>T-Shirt Size:</b> {ticketData.tShirtSize}</div>
                                        { ticketData.product ?  <div><b>Ticket Type:</b> {ticketData.productName}</div> : null}
                                    </div>
                                    {
                                        ticketData.status ?
                                            <React.Fragment>
                                                <div className="form-group">
                                                    <label htmlFor="ticketno">Ticket No.</label>
                                                    <input
                                                        className="form-control"
                                                        type="number" pattern="[0-9]*" inputmode="numeric"
                                                        placeholder="Enter Ticket No."
                                                        required
                                                        onChange={(e) => setTicketNo(e.target.value)}
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => handleIssueTicket()}
                                                    className="btn btn-success m-1 rounded-0 btn-shadow"
                                                >
                                                    Issue Ticket
                                                </button>
                                            </React.Fragment> : null
                                    }
                                    <button
                                        onClick={() => { setQrScanned(false); setTicketData(false); }}
                                        className="btn btn-danger m-1 rounded-0 btn-shadow"
                                    >
                                         Scan Another
                                    </button>
                                </div>
                            </div>
                        </div> : null
                }
            </div>
        <BottomBar
            currentTabIcon={require('../../images/icons/dashboard-bottom-bar-icon.png')}
            currentTabName="Ticketing"
            hideExploreTab
        />
    </Base>
};

export default IssueTicket;