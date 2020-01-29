import React, {useState} from "react";
import Head from "next/head";

import Base from "../../components/base";
import AdminRequired from "../../components/adminRequired";
import TitleBar from "../../components/titleBar";
import DashboardFooter from "../../modules/dashboard/footer";
import dataFetch from "../../utils/dataFetch";
import StatusContainer from "../../components/StatusContainer";
import MenuBar from "../../components/common/menubar";
import Topbar from "../../components/common/topbar";
import Card from "../../components/dashboard/Card";
import dynamic from "next/dynamic";
import NoSSR from "../../components/noSSR";
import BottomBar from "../../components/common/bottombar";

const ViewProfile = () => {
    const [isLoaded, setLoaded] = useState(true);
    const [data, setData] = useState(false);
    const [key, setKey] = useState(false);
    const [error, setError] = useState(false);
    const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false});

    const query = `query getProfile($key: String!)
    {
      getProfile(key: $key)
      {
        firstName
        lastName
        vidyutID
        vidyutHash
        isFaculty
        isSchoolStudent
        isAmritapurian
        phone
        email
        rollNo
        gender
        proshowTicket
        hasCheckedIn
        physicalTicket
        registrations
        profileCompletion
        {
          status
          message
        }
        college
        {
          name
        }
        photo
        idPhoto
      }
    }`;

    const getProfile = async () => await dataFetch({ query, variables: { key } });

    const [hash, setHash] = useState(false);
    const handleSearch = () => {
        setLoaded(false);
       getProfile().then((response) => {
           if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
               setData(response.data.getProfile);
               setHash(response.data.getProfile.vidyutHash);
               setLoaded(true);
           }
           else {
               setError(response.errors);
               setLoaded(true);
           }
       })
    };

    const mutation = `mutation checkInUser($hash: String!){
      performGeneralCheckIn(hash: $hash)
    }`;
    const checkInUser = async variables => await dataFetch({ query: mutation, variables });

    const [isSubmitting, setSubmitting] = useState(false);

    const handleCheckIn = () => {
        if(hash)
        {
            setSubmitting(true);
            checkInUser({
                hash
            }).then(response => {
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setHash(false);
                    setSubmitting(false);
                    handleTryAgain();
                };
            })
        }
    };

    const handleScan = data => {
        if(data != null && data !== key)
        {
            setKey(data);
        }
    };

    const renderSearchCard = () => (
        <div className="card-shadow d-flex align-items-center p-2" style={{ minHeight: '75vh' }}>
            <div className="w-100">
                <h5 className="text-center my-4">Event Check-In</h5>
                <div className="row m-0">
                    <div className="col-md-8 d-flex justify-content-center align-items-center">
                        <div className="form-group">
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
                                style={{width: '80%', maxWidth: "300px"}}
                            />
                        </NoSSR>
                    </div>
                    <div className="col-12 text-center mt-2">
                        {
                            key && key.length > 3 ?
                                <button
                                    className="btn btn-primary rounded-0 my-2 px-4 py-2"
                                    onClick={handleSearch}
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

    const renderProfileCard = () => !isSubmitting ? <div className="container p-0">
        <div className="row m-0 my-md-2">
            <div className="col-12 p-0">
                <div className="card-shadow p-0">
                    <div className="row m-0">
                        <div className="col-md-3 text-center col-lg-2">
                            <img
                                alt="profile photo"
                                src={data.photo ? data.photo : require('../../images/icons/user.png')}
                                style={{ maxHeight: "200px" }}
                            />
                        </div>
                        <div className="col p-0">
                            <div className="p-3 text-center text-md-left">
                                <h3>{data.firstName} {data.lastName}</h3>
                                <div className="font-weight-bold">{data.college ? data.college.name : null}</div>
                                <div className="p-2">
                                    {
                                        data.hasCheckedIn ?
                                            <span className="badge badge-danger mr-2 my-2 p-2">Already Checked-In</span>
                                            :  <span className="badge badge-success mr-2 my-2  p-2">Not Checked-In</span>
                                    }
                                    {
                                        data.isFaculty ?
                                            <span className="badge badge-primary mr-2 my-2  p-2">Faculty / Professional</span>
                                            : data.isSchoolStudent ?
                                            <span className="badge badge-primary mr-2 my-2  p-2">School Student</span> :
                                            <span className="badge badge-primary mr-2 my-2  p-2">College Student</span>
                                    }
                                    {
                                        !data.profileCompletion.status ?
                                            <span className="badge badge-danger mr-2 p-2">Profile Incomplete</span>
                                            :  <span className="badge badge-success mr-2 p-2">Profile Complete</span>
                                    }
                                </div>
                                <div className="py-2">
                                    <button
                                        className="btn btn-success btn-shadow btn-block mr-2 mb-3 rounded-0 px-4 py-4"
                                        onClick={handleCheckIn}
                                    >
                                        Check-In User
                                    </button>
                                    <button
                                        className="btn btn-danger btn-shadow btn-block mr-2 my-1 rounded-0 px-4 py-2"
                                        onClick={handleTryAgain}
                                    >
                                        Reject User
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 p-0">
                <Card
                    title="Registrations"
                    content={
                        <div className="p-2">
                            {
                                data.registrations.length >0 ? data.registrations.map(r =>
                                    <div className="card-shadow p-4 my-2">
                                        <h4>{r}</h4>
                                    </div>
                                ) : <div>No registrations found</div>
                            }
                        </div>
                    }
                />
            </div>
            <div className="col-md-6 p-0">
                <Card
                    title="Proshow Details"
                    content={
                        <div className="p-4">
                            <div>
                                <div className="font-weight-bold">Ticket Name</div>
                                <h3>{ data.proshowTicket }</h3>
                            </div>
                            <div>
                                <div className="font-weight-bold">Physical Ticket</div>
                                <h3>{data.physicalTicket}</h3>
                            </div>
                        </div>
                    }
                />
            </div>
            <div className="col-md-4 p-1">
                <img src={data.idPhoto ? data.idPhoto : require('../../images/icons/user.png')} style={{ width: "150px" }} />
            </div>
            <div className="col-md-8 p-1">
                <Card
                    title="Profile Details"
                    content={
                        <div className="my-2 p-3">
                            <div className="alert alert-info">{data.profileCompletion.message}</div>
                            <div><b>VID</b>: {data.vidyutID}</div>
                            <div><b>Email</b>: {data.email}</div>
                            <div><b>Phone</b>: {data.phone}</div>
                            <div><b>Gender</b>: {data.gender === 'M' ? "Male" : "Female"}</div>
                            <div><b>Roll No</b>: {data.rollNo}</div>
                        </div>
                    }
                />
            </div>
        </div>
    </div> :  <div className="container p-0">
        <div className="card-shadow p-2">
            Performing Check-In
        </div>
    </div>;

    const handleTryAgain = () => {
        setError(false);
        setData(false);
    };

    return (
        <Base loginRequired adminRequired>
            <Head>
                <title>View Profile | Admin | Vidyut 2020</title>
            </Head>
            <Topbar/>
            <MenuBar />
            <AdminRequired>
            <div className="container p-0">
                { !error ?
                    isLoaded ?
                        !data ?
                            renderSearchCard() : renderProfileCard()
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
            </AdminRequired>
            <BottomBar
                hideExploreTab
                currentTabName="Registration"
                currentTabIcon={require('../../images/icons/dashboard-bottom-bar-icon.png')}
            />
        </Base>
    )

};

export default ViewProfile;