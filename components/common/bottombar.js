import React, {useState} from "react";
import classNames from 'classnames';

import UserSidebar from "../cards/userSidebar";

import '../../styles/common/bottombar.sass';
import NotificationCard from "../cards/notifications";
import MyVidyut from "../cards/myVidyut";
import DeveloperCredits from "../cards/developerCredits";
import ProtectedComponent from "../protectedComponent";

const BottomBar = ({ currentTabName, currentTabIcon, hideDeveloperCredits, hideExploreTab }) => {
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
            {
                !hideDeveloperCredits ?
                    <React.Fragment>
                        <div style={{ marginBottom: "15vh" }} />
                        <div className="d-md-block d-none mt-4 pt-4">
                            <DeveloperCredits />
                        </div>
                    </React.Fragment>
                : null
            }
            <div className="d-block d-md-none" id="bottom-bar">
                <div className="tab-switcher">
                    <div className="d-flex justify-content-center">
                        <div className="p-2">
                            <button
                                onClick={() => setTab('home')}
                                className={classNames("plain-button tab-button", tab === 'home' ? 'selected' : null)}
                            >
                                <img
                                    src={currentTabIcon ? currentTabIcon : require('../../images/icons/feed-icon.png')}
                                    alt={`${currentTabName ? currentTabName : 'Page'} tab`}
                                />
                                <div>{currentTabName ? currentTabName : 'Page'}</div>
                            </button>
                        </div>
                        {
                            !hideExploreTab ?
                            <div className="p-2">
                                <a href="/explore">
                                    <button
                                        onClick={() => setTab('home')}
                                        className={classNames("plain-button tab-button")}
                                    >
                                        <img
                                            src={require('../../images/icons/explore-icon.png')}
                                            alt={`Explore tab`}
                                        />
                                        <div>Explore</div>
                                    </button>
                                </a>
                            </div> : null
                        }
                        <ProtectedComponent>
                            <div className="p-2">
                                <button
                                    onClick={() => setTab('myvidyut')}
                                    className={classNames("plain-button tab-button", tab === 'myvidyut' ? 'selected' : null)}
                                >
                                    <img src={require('../../images/icons/my-vidyut-bottom-bar-icon.png')} alt="my tab" />
                                    <div>My Vidyut</div>
                                </button>
                            </div>
                            <div className="p-2">
                                <button
                                    onClick={() => setTab('notification')}
                                    className={classNames("plain-button tab-button", tab === 'notification' ? 'selected' : null)}
                                >
                                    <img src={require('../../images/icons/heart-bottom-bar-icon.png')} alt="notification tab" />
                                    <div>Notifications</div>
                                </button>
                            </div>
                        </ProtectedComponent>
                        <div className="p-2">
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
            { tab === 'profile' ? renderProfileTab() : null }
            { tab === 'notification' ? renderNotificationTab() : null }
            { tab === 'myvidyut' ? renderMyVidyutTab() : null}
        </React.Fragment>
    )
};

export default BottomBar;