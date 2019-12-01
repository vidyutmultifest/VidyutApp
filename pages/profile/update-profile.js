import React, {useEffect, useState} from "react";
import dataFetch from "../../utils/dataFetch";

import Base from "../../components/base";
import TitleBar from "../../components/titleBar";
import DashboardFooter from "../../modules/dashboard/footer";

const UpdateProfile = () => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [profileData, setData] = useState();

    const query = `{
      myProfile
      {
        firstName
        lastName
        isAmritian
        isAmritapurian
        college
        {
            name
            location
        }
        rollNo
        location
        phone
      }
    }`;

    const getProfile = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried)
        {
            getProfile().then(  response => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data);
                    setLoaded(true);
                }
            })
        }
    });

    return <Base loginRequired>
        <TitleBar />
        <div className="container my-4 ">
            <div className="card-shadow p-4">
                <h3>Update Profile</h3>
                <form>
                    <div className="form-group">
                        <label for="rollNo">Roll No.</label>
                        <input name="rollNo" className="form-control" />
                    </div>
                </form>
            </div>
        </div>
        <DashboardFooter />
    </Base>

};
export default UpdateProfile;