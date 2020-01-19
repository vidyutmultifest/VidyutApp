import React, {useState} from "react";
import classNames from 'classnames';

import '../../styles/common/menubar.sass';
import UserSidebar from "../cards/userSidebar";

const MenuBar = ({ showProfileOnMobile }) => {
    const [isUserSidebarOpen, setOpenUserSidebar] = useState(false);
    return (
        <div id="menubar">
            <div className="container p-0">
                <div className="row m-0">
                    <div className={classNames("col-lg-4 col-md-3 px-0", showProfileOnMobile ? 'col-9' : 'col-12 text-md-left text-center')}>
                        <a href="/dashboard">
                            <img className="vidyut-logo" src={require('../../images/branding/vidyut_logo_light.png')} alt="Vidyut Logo, Dashboard Button" />
                        </a>
                    </div>
                    <div className={classNames("col-lg-8 col-md-9 px-0 d-flex align-items-center justify-content-end", showProfileOnMobile ? 'col-3' : 'col-0')}>
                        <div className="d-md-flex d-none">
                            <div className="desktop-menu">
                                <button>
                                    <a href="/">About</a>
                                </button>
                                <button>
                                    <a href="/shows">Shows</a>
                                </button>
                                <button>
                                    <a href="/competitions">Competitions</a>
                                </button>
                                <button>
                                    <a href="/workshops">Workshops</a>
                                </button>
                            </div>
                        </div>
                        <div className={classNames(showProfileOnMobile ? 'd-block' : 'd-none d-md-block')}>
                            <button className="menu-profile-icon" onClick={() => setOpenUserSidebar(true)}>
                                <img src={require('../../images/icons/user.png')} alt="Profile" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <div
                 id="user-sidebar-wrapper"
                 onClick={() =>setOpenUserSidebar(false)}
                 className={classNames(!isUserSidebarOpen ? 'd-none' : null)}
            />
            <div id="user-sidebar" className={classNames(!isUserSidebarOpen ? 'd-none' : null)}>
                <UserSidebar />
            </div>
        </div>
    )
};

export default MenuBar;