import React, {useState} from "react";
import classNames from 'classnames';

import '../../styles/common/menubar.sass';
import UserSidebar from "../cards/userSidebar";

const MenuBar = () => {
    const [isUserSidebarOpen, setOpenUserSidebar] = useState(false);
    return (
        <div id="menubar">
            <div className="container p-0">
                <div className="row m-0">
                    <div className="col-lg-4 col-md-3 col-12 text-md-left text-center px-0">
                        <a href="/dashboard">
                            <img className="vidyut-logo" src={require('../../images/branding/vidyut_logo_light.png')} alt="Vidyut Logo, Dashboard Button" />
                        </a>
                    </div>
                    <div className="col-lg-8 col-md-9 col-0 px-0 d-flex align-items-center justify-content-end">
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
                 className={classNames('d-none', isUserSidebarOpen ? 'd-md-block' : null)}
            />
            <div id="user-sidebar" className={classNames('d-none', isUserSidebarOpen ? 'd-md-block' : null)}>
                <UserSidebar />
            </div>
        </div>
    )
};

export default MenuBar;