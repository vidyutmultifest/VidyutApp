import React, {useEffect, useState} from "react";
import QRCode from "qrcode.react";
import classNames from 'classnames';

import '../../styles/common/user-sidebar.sass';
import dataFetch from "../../utils/dataFetch";
import DeveloperCredits from "./developerCredits";
import {useRouter} from "next/router";
import Cookies from "universal-cookie";

const cookies = new Cookies();


const UserSidebar = () => {
    const router = useRouter();

    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);

    const query = `{
      myProfile
      {
        vidyutID
        vidyutHash
        firstName
        lastName
        isAmritapurian
        photo
        isSchoolStudent
        isFaculty
      }
      myPermissions
      {
        adminAccess
      }
    }`;

    const getProfile = async () => await dataFetch({ query });

    const [isAdmin, setAdmin] = useState(false);
    useEffect(() => {
        if(!isQueried)
        {
            getProfile().then(  response => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.myProfile);
                    setAdmin(response.data.myPermissions ? response.data.myPermissions.adminAccess : false );
                    setLoaded(true);
                }
            })
        }
    });

    const handleLogout = () => {
        cookies.remove('token');
        cookies.remove('refreshToken');
        cookies.remove('username');
        cookies.remove('transactionID');
        localStorage.clear();
        router.push('/');
    };

    const renderProfileCard = () => (
      <div className="profile-card">
            <div className="row m-0">
                <div className="col-9 d-flex align-items-center p-0">
                    {
                        isLoaded ?
                            data ?
                                <div>
                                    <h4>Hi {data.firstName} {data.lastName}!</h4>
                                    <div className="account-type-text">
                                        {
                                            data.isFaculty ? 'Faculty Account'
                                                : data.isSchoolStudent ? 'School Student Account'
                                                : 'College Student Account'
                                        }
                                    </div>
                                    <a href="/profile/edit-profile" className="plain-link">
                                        Edit Profile >
                                    </a>
                                </div>
                            : <div>
                                    <h4>Register for Vidyut</h4>
                                    <a href="/login" className="plain-link">
                                        Log In
                                    </a>
                                </div> : <div>
                                <h4>Loading Profile</h4>
                            </div>
                    }

                </div>
                <div className="col-3 d-flex align-items-center p-0">
                    {
                        isLoaded && data && data.photo ?
                            <div className="profile-photo">
                                <img src={data.photo} alt="user-photo" />
                            </div> : null
                    }
                </div>
            </div>
      </div>
    );

    const renderVidyutID = () => (
        <div className={classNames('vidyut-id-card', data.isAmritapurian ? 'insider' : null)}>
            <div className="row m-0">
                <div className="col-6 p-2 d-flex align-items-center">
                    <div>
                        <div className="profile-type">{ data.isAmritapurian ? 'Insider' : 'Outsider' }</div>
                        <div className="vidyut-id">{data.vidyutID}</div>
                    </div>
                </div>
                <div className="col-6 d-flex fa-align-center justify-content-center p-0">
                    <div className="vidyut-qr"><QRCode value={data.vidyutHash} size={150} /></div>
                </div>
            </div>

        </div>
    );

    return (
      <div className="user-profile-tab">
          { renderProfileCard() }
          { data ? renderVidyutID() : null}
          <div className="sidebar-menu">
              {
                  data ? (
                    <React.Fragment>
                        {
                            isAdmin ?
                                <a href="/admin">
                                    <img src={require('../../images/icons/user-group-bottom-bar-icon.png')} />
                                    Admin Dashboard
                                </a> : null
                        }
                        <a target="_blank" href="https://drive.google.com/file/d/10j6LTVvQ8UkyuwTW5NXEyPh4EnoVBWz7/view?usp=drivesdk">
                            <img src={require('../../images/icons/calendar-icon.png')} />
                            Event Schedule
                        </a>
                        <a href="/explore">
                            <img src={require('../../images/icons/explore-icon.png')} />
                            Explore Vidyut
                        </a>
                        <a href="/my-registrations">
                            <img src={require('../../images/icons/order-bottom-bar-icon.png')} />
                            Event Registrations
                        </a>
                        <a href="/my-orders">
                            <img src={require('../../images/icons/cash-icon.png')} />
                            Purchase History
                        </a>
                        <a href="/my-teams">
                            <img src={require('../../images/icons/user-group-bottom-bar-icon.png')} />
                            Teams
                        </a>
                        <a href="/sponsors">
                            <img src={require('../../images/icons/heart-icon.png')} />
                            Sponsors
                        </a>
                    </React.Fragment>
                  ) : (
                      <a href="/explore">
                          <img src={require('../../images/icons/explore-icon.png')} />
                          Explore Vidyut
                      </a>
                  )
              }
              <a href="/help">
                  <img src={require('../../images/icons/support-icon.png')} />
                  Help & Support
              </a>
          </div>
          <div className="text-center p-2">
              {
                  data ?
                      <button onClick={handleLogout} className="signout-button">Log Out</button>
                  :  <a href="/login">
                          <button className="signout-button">Login In</button>
                  </a>
              }
          </div>
          <div className="my-4">
              <DeveloperCredits />
          </div>
      </div>
    );

};

export  default UserSidebar;