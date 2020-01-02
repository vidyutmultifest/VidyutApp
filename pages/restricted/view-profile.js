import React, {useState} from "react";
import Head from "next/head";

import Base from "../../components/base";
import AdminRequired from "../../components/adminRequired";
import TitleBar from "../../components/titleBar";
import DashboardFooter from "../../modules/dashboard/footer";
import dataFetch from "../../utils/dataFetch";
import StatusContainer from "../../components/StatusContainer";

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
        hasEventsRegistered
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

    const renderProfileCard = () => (
        <div className="row m-0">
            <div className="col-12">
                <div className="card-shadow">
                    <div className="d-flex p-4">
                        <img src={data.photo ? data.photo : require('../../images/icons/user.png')} style={{ width: "150px" }} />
                        <div className="p-4">
                            <h3>{data.firstName} {data.lastName}</h3>
                            <div className="font-weight-bold">
                                VID: {data.vidyutID}
                            {
                                data.isAmritapurian ?
                                    <span> | <div className="badge badge-success">Amritapurian</div> | Roll No.: {data.rollNo ? data.rollNo : "Not Entered"}</span> : null
                            }
                            </div>
                            <div className="font-weight-bold">{data.college ? data.college.name : null}</div>
                            {
                                data.isFaculty ?
                                    <div className="badge badge-primary">Faculty / Professional</div>
                                : data.isSchoolStudent ?
                                    <div className="badge badge-primary">School Student</div> :
                                <div className="badge badge-primary">College Student</div>
                            }
                            {
                                !data.isProfileComplete ?
                                    <div className="badge badge-danger">Profile Incomplete</div>
                                :  <div className="badge badge-success">Profile Complete</div>
                            }
                        </div>
                    </div>
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
        </div>
    );

    const handleTryAgain = () => {
        setError(false);
        setData(false);
    };

    return (
        <Base loginRequired adminRequired>
            <Head>
                <title>View Profile | Admin | Vidyut 2020</title>
            </Head>
            <TitleBar/>
            <AdminRequired>
                <div className="container my-4">
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
                </div>
            </AdminRequired>
            <DashboardFooter/>
        </Base>
    )

};

export default ViewProfile;