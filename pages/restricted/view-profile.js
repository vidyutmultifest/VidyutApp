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

const ViewProfile = () => {
    const [isLoaded, setLoaded] = useState(true);
    const [data, setData] = useState(false);
    const [key, setKey] = useState(false);
    const [error, setError] = useState(false);

    const query = `query getProfile($key: String!)
    {
      getProfile(key: $key)
      {
        firstName
        lastName
        vidyutID
        isFaculty
        isSchoolStudent
        isAmritapurian
        phone
        email
        rollNo
        gender
        proshowTicket
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

    const handleSearch = () => {
        setLoaded(false);
       getProfile().then((response) => {
           if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
               setData(response.data.getProfile);
               setLoaded(true);
           }
           else {
               setError(response.errors);
               setLoaded(true);
           }
       })
    };

    const renderSearchCard = () => (
        <div className="card-shadow p-4">
            <h3>View Profile</h3>
            <div className="form-group">
                <input
                    className="form-control rounded-0"
                    placeholder="Enter VidyutID / Email / Username"
                    onChange={(e) => setKey(e.target.value)}
                />
            </div>
            {
                key && key.length > 3 ?
                    <button
                        className="btn btn-primary rounded-0 px-4 py-2"
                        onClick={handleSearch}
                    >
                        View Profile
                    </button>
                    : null
            }
        </div>
    );

    const renderProfileCard = () => <div className="container p-0">
        <div className="row m-0 my-2">
            <div className="col-12 p-1">
                <div className="card-shadow d-flex h-100 p-0">
                    <img
                        alt="profile photo"
                        src={data.photo ? data.photo : require('../../images/icons/user.png')}
                        style={{ height: "35vh", maxHeight: "200px" }}
                    />
                    <div className="p-3">
                        <h3>{data.firstName} {data.lastName}</h3>
                        <div className="font-weight-bold">{data.college ? data.college.name : null}</div>
                        {
                            data.isFaculty ?
                                <div className="badge badge-primary p-2">Faculty / Professional</div>
                                : data.isSchoolStudent ?
                                <div className="badge badge-primary p-2">School Student</div> :
                                <div className="badge badge-primary p-2">College Student</div>
                        }
                        <div className="p-2">
                            {
                                !data.profileCompletion.status ?
                                    <div className="badge badge-danger p-2">Profile Incomplete</div>
                                    :  <div className="badge badge-success p-2">Profile Complete</div>
                            }
                        </div>
                        <div className="py-2">
                            <button
                                className="btn btn-primary btn-shadow mr-2 my-1 rounded-0 px-4 py-2"
                            >
                                Check-In User
                            </button>
                            <button
                                className="btn btn-danger btn-shadow mr-2 my-1 rounded-0 px-4 py-2"
                                onClick={handleTryAgain}
                            >
                                View Another Profile
                            </button>
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
                    { !error ?
                        isLoaded ?
                            !data ? renderSearchCard() : renderProfileCard()
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
            </AdminRequired>
            <DashboardFooter/>
        </Base>
    )

};

export default ViewProfile;