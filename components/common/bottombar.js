import React, {useState} from "react";
import classNames from 'classnames';

import UserSidebar from "../cards/userSidebar";

import '../../styles/common/bottombar.sass';
import NotificationCard from "../cards/notifications";
import MyVidyut from "../cards/myVidyut";

const BottomBar = ({ currentTabName, currentTabIcon }) => {
    const [tab, setTab] = useState('home');

    const renderProfileTab = () => (
        <div id="profile-tab" className={classNames('dashboard-tab', tab !== 'profile' ? 'd-none' : null)}>
            <UserSidebar />
            <div style={{ height: '25vh' }} />
        </div>
    );

    const renderNotificationTab = () => (
        <div id="notification-tab" className={classNames('dashboard-tab', tab !== 'notification' ? 'd-none' : null)}>
            <NotificationCard />
            <div style={{ height: '25vh' }} />
        </div>
    );

    const renderMyVidyutTab = () => (
        <div id="my-vidyut-tab" className={classNames('dashboard-tab', tab !== 'myvidyut' ? 'd-none' : null)}>
            <MyVidyut />
            <div style={{ height: '25vh' }} />
        </div>
    );

    return (
        <React.Fragment>
            <div className="d-block d-md-none" id="bottom-bar">
                <div className="tab-switcher">
                    <div className="row m-0">
                        <div className="col-3 p-2">
                            <button
                                onClick={() => setTab('home')}
                                className={classNames("plain-button tab-button", tab === 'home' ? 'selected' : null)}
                            >
                                <img src={currentTabIcon ? currentTabIcon : require('../../images/icons/home-bottom-bar-icon.png')} alt="home tab" />
                                <div>{currentTabName ? currentTabName : 'Home'}</div>
                            </button>
                        </div>
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
                                <div>Profile</div>
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