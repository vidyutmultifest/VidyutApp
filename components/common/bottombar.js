import React, {useState} from "react";
import classNames from 'classnames';

import UserSidebar from "../cards/userSidebar";

import '../../styles/common/bottombar.sass';
import NotificationCard from "../cards/notifications";
import MyVidyut from "../cards/myVidyut";
import DeveloperCredits from "../cards/developerCredits";

const BottomBar = ({ currentTabName, currentTabIcon, showDashboardIcon }) => {
    const [tab, setTab] = useState('home');

    const renderProfileTab = () => (
        <div id="profile-tab" className={classNames('dashboard-tab', tab !== 'profile' ? 'd-none' : null)}>
            <UserSidebar />
            <div style={{ height: '300px' }} />
        </div>
    );

    const renderNotificationTab = () => (
        <div id="notification-tab" className={classNames('dashboard-tab', tab !== 'notification' ? 'd-none' : null)}>
            <NotificationCard />
            <div style={{ height: '300px' }} />
        </div>
    );

    const renderMyVidyutTab = () => (
        <div id="my-vidyut-tab" className={classNames('dashboard-tab', tab !== 'myvidyut' ? 'd-none' : null)}>
            <MyVidyut />
            <div style={{ height: '300px' }} />
        </div>
    );

    return (
        <React.Fragment>
            <div style={{ marginBottom: "15vh" }} />
            <div className="d-md-block d-none mt-4 pt-4">
                <DeveloperCredits />
            </div>
            <div className="d-block d-md-none" id="bottom-bar">
                <div className="tab-switcher">
                    <div className="row m-0">
                        {
                            !showDashboardIcon ?
                                <div className="col-3 p-2">
                                    <button
                                        onClick={() => setTab('home')}
                                        className={classNames("plain-button tab-button", tab === 'home' ? 'selected' : null)}
                                    >
                                        <img
                                            src={currentTabIcon ? currentTabIcon : require('../../images/icons/home-bottom-bar-icon.png')}
                                            alt={`${currentTabName ? currentTabName : 'dashboard'} tab`}
                                        />
                                        <div>{currentTabName ? currentTabName : 'Dashboard'}</div>
                                    </button>
                                </div> :
                                <div className="col-3 p-2">
                                    <a href="/dashboard">
                                        <button
                                            onClick={() => setTab('home')}
                                            className={classNames("plain-button tab-button")}
                                        >
                                            <img src={require('../../images/icons/dashboard-bottom-bar-icon.png')} alt="dashboard tab" />
                                            <div>Dashboard</div>
                                        </button>
                                    </a>
                                </div>
                        }
                        <div className="col-3 p-2">
                            <button
                                onClick={() => setTab('myvidyut')}
                                className={classNames("plain-button tab-button", tab === 'myvidyut' ? 'selected' : null)}
                            >
                                <img src={require('../../images/icons/my-vidyut-bottom-bar-icon.png')} alt="my tab" />
                                <div>My Vidyut</div>
                            </button>
                        </div>
                        <div className="col-3 p-2">
                            <button
                                onClick={() => setTab('notification')}
                                className={classNames("plain-button tab-button", tab === 'notification' ? 'selected' : null)}
                            >
                                <img src={require('../../images/icons/heart-bottom-bar-icon.png')} alt="notification tab" />
                                <div>Notifications</div>
                            </button>
                        </div>
                        <div className="col-3 p-2">
                            <button
                                onClick={() => setTab('profile')}
                                className={classNames("plain-button tab-button", tab === 'profile' ? 'selected' : null)}
                            >
                                <img src={require('../../images/icons/profile-bottom-bar-icon.png')} alt="profile tab" />
                                <div>Navigation</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            { renderProfileTab() }
            { renderNotificationTab() }
            { renderMyVidyutTab() }
        </React.Fragment>
    )
};

export default BottomBar;