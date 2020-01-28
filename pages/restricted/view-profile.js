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
            <div className="col-lg-3 col-md-2 text-center p-1">
                <img
                    src={data.photo ? data.photo : require('../../images/icons/user.png')}
                    style={{ maxHeight: "50vh" }}
                />
            </div>
            <div className="col-lg-9 col-md-10 p-1">
                <div className="card-shadow h-100 p-4">
                    <h3>{data.firstName} {data.lastName}</h3>
                    <div className="font-weight-bold">{data.college ? data.college.name : null}</div>
                    {
                        data.isFaculty ?
                            <div className="badge badge-primary rounded-0">Faculty / Professional</div>
                            : data.isSchoolStudent ?
                            <div className="badge badge-primary rounded-0">School Student</div> :
                            <div className="badge badge-primary rounded-0">College Student</div>
                    }
                    {
                        !data.profileCompletion.status ?
                            <div className="badge badge-danger rounded-0">Profile Incomplete</div>
                            :  <div className="badge badge-success rounded-0">Profile Complete</div>
                    }
                    <div className="p-2 text-center">
                        <button
                            className="btn btn-primary rounded-0 my-4 px-4 py-2"
                            onClick={handleTryAgain}
                        >
                            View Another Profile
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-6 p-1">
                <img src={data.idPhoto ? data.idPhoto : require('../../images/icons/user.png')} style={{ width: "150px" }} />
            </div>
            <div className="col-6 p-1">
                <div className="card-shadow">
                        <li>VID: {data.vidyutID}</li>
                        <li>Email: {data.email}</li>
                        <li>Phone: {data.email}</li>
                        <li>Gender: {data.gender}</li>
                        <li>Roll No: {data.rollNo}</li>
                </div>
            </div>
            <div>
                <div className="card-shadow">
                    {
                        data.map()
                    }
                </div>
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