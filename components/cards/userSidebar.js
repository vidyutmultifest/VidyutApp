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
      }
    }`;

    const getProfile = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried)
        {
            getProfile().then(  response => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.myProfile);
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
                    <div>
                        <h4>Hi {data.firstName} {data.lastName}!</h4>
                        <a href="/profile/edit-profile" className="plain-link">
                            Edit Profile >
                        </a>
                    </div>
                </div>
                <div className="col-3 d-flex align-items-center p-0">
                    {
                        data.photo ?
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
          { data ? renderProfileCard() : null }
          { data ? renderVidyutID() : null}
          <div className="sidebar-menu">
              <a href="/dashboard">
                  <img src={require('../../images/icons/dashboard-bottom-bar-icon.png')} />
                  Dashboard
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
              <a href="/help">
                  <img src={require('../../images/icons/support-icon.png')} />
                  Help & Support
              </a>
          </div>
          <div className="text-center p-2">
              <button onClick={handleLogout} className="signout-button">Sign Out</button>
          </div>
          <div className="my-4">
              <DeveloperCredits />
          </div>
      </div>
    );

};

export  default UserSidebar;