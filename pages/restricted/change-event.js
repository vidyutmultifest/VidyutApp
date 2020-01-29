import React, {useState} from "react";
import Head from "next/head";
import Topbar from "../../components/common/topbar";
import MenuBar from "../../components/common/menubar";
import BottomBar from "../../components/common/bottombar";
import NoSSR from "../../components/noSSR";
import dynamic from "next/dynamic";
import dataFetch from "../../utils/dataFetch";
import Base from "../../components/base";
import StatusContainer from "../../components/StatusContainer";

const ChangeEvent = () => {
    const [isLoaded, setLoaded] = useState(true);
    const [data, setData] = useState(false);
    const [key, setKey] = useState(false);
    const [error, setError] = useState(false);
    const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false});

    const getRegsQuery = `query listRegs($key: String!)
    {
      listUserRegistrations(key: $key)
      {
        regID
        eventName
        transaction { isPaid }
      }
      listProducts
      {
         name
         productID
      }
    }`;

    const getRegs = async variables => await dataFetch({ query: getRegsQuery, variables });

    const [products, setProducts] = useState(false);
    const handleSearch = (data) => {
        setLoaded(false);
        getRegs({ key: data}).then((response) => {
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                setData(response.data.listUserRegistrations);
                setProducts(response.data.listProducts);
                setLoaded(true);
            }
            else {
                setError(response.errors);
                setLoaded(true);
            }
        })
    };

    const handleScan = data => {
        if(data != null && data !== key)
        {
            setKey(data);
            handleSearch(data);
        }
    };

    const handleTryAgain = () => {
        setKey(false);
        setError(false);
        setData(false);
    };

    const renderSearchCard = () => (
        <div className="card-shadow d-flex align-items-center p-2" style={{ minHeight: '75vh' }}>
            <div className="w-100">
                <h3 className="text-center mb-2">Change Event</h3>
                <div className="row m-0">
                    <div className="col-md-8 d-flex justify-content-center align-items-center">
                        <div className="form-group w-100">
                            <input
                                className="form-control rounded-0"
                                placeholder="Enter VidyutID / Email / Username"
                                onChange={(e) => setKey(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-4 d-flex align-items-center justify-content-center text-center">
                        <NoSSR>
                            <QrReader
                                delay={20}
                                onScan={handleScan}
                                onError={(e) => console.log(e)}
                                facingMode="environment"
                                style={{width: '100%', maxWidth: "200px", maxHeight: '50vh'}}
                            />
                        </NoSSR>
                    </div>
                    <div className="col-12 text-center mt-2">
                        {
                            key && key.length > 3 ?
                                <button
                                    className="btn btn-primary rounded-0 my-2 px-4 py-2"
                                    onClick={() => handleSearch(key)}
                                >
                                    View Profile
                                </button>
                                : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );

    const mutation = `query changeEvent($regID: String!, $eventID: String!){
      changeEvent(regID: $regID, eventID: $eventID)
    }`;
    const changeEvent = async variables => await dataFetch({ query: mutation, variables });

    const [isSubmitting, setSubmitting] = useState(false);
    const handleEventChange = () => {
        if(oldEvent && newEvent && oldEvent !== 'false' && newEvent !== 'false')
        {
            setSubmitting(true);
            changeEvent({
                regID: oldEvent, eventID: newEvent
            }).then(response => {
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setOldEvent(false);
                    setNewEvent(false);
                    setKey(false);
                    setSubmitting(false);
                    handleTryAgain();
                }
            })
        }
    };

    const [oldEvent, setOldEvent] = useState(false);
    const [newEvent, setNewEvent] = useState(false);
    const renderSwitchingCard = () => !isSubmitting ? (
        <div className="card-shadow mt-4 p-4">
            <h3>Change Event</h3>
            <div className="form-group mt-4">
                <label htmlFor="oldeventsel">Select Old Event</label>
                <select
                    className="form-control"
                    id="oldeventsel"
                    defaultValue="false"
                    onChange={(e) => setOldEvent(e.target.value)}
                >
                    <option disabled defaultChecked value="false">
                        Select old Event
                    </option>
                    {
                        data.map(i =>
                            <option value={i.regID}>
                                {i.eventName} {i.transaction && i.transaction.isPaid ? '(Paid)' : '(Unpaid)'}
                            </option>
                        )
                    }
                </select>
            </div>
            <div className="form-group mt-4">
                <label htmlFor="neweventsel">Select New Event</label>
                <select
                    className="form-control"
                    id="neweventsel"
                    defaultValue="false"
                    onChange={(e) => setNewEvent(e.target.value)}
                >
                    <option defaultChecked defaultValue disabled value="false">
                        Select New Event
                    </option>
                    {
                        products.map(i =>
                            <option value={i.productID}>
                                {i.name}
                            </option>
                        )
                    }
                </select>
            </div>
            <button
                className="btn btn-shadow btn-primary rounded-0 mr-2 p-2"
                onClick={handleEventChange}
            >
                Change Event
            </button>
            <button
                className="btn btn-shadow btn-danger rounded-0 p-2"
                onClick={handleTryAgain}
            >
                Try Another
            </button>
        </div>
    ) :  <div className="container p-0">
        <div className="card-shadow p-2">
            Changing Event
        </div>
    </div>;

    return <Base>
        <Head>
            <title> Change Event | Admin | Vidyut 2020</title>
        </Head>
        <Topbar/>
        <MenuBar />
        <div className="container p-0">
            { !error ?
                isLoaded ?
                    !data ?
                        renderSearchCard() : renderSwitchingCard()
                    : <div className="card-shadow p-4">
                        <StatusContainer
                            title="Fetching Details"
                            animation={require('../../images/animations/radar')}
                        />
                    </div>
                : <div className="card-shadow p-4">
                    <div className="alert alert-danger">
                        <h5>We couldn't fetch the Profile</h5>
                        {
                            error.map(e => (
                                <li>{e.message}</li>
                            ))
                        }
                        <button
                            className="btn btn-primary rounded-0 px-4 py-2"
                            onClick={handleTryAgain}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            }
        </div>
        <BottomBar
            currentTabName="Change Event"
            currentTabIcon={require('../../images/icons/dashboard-bottom-bar-icon.png')}
            hideExploreTab
        />
    </Base>

};

export default ChangeEvent;