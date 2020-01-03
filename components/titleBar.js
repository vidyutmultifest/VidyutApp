import React, {useEffect, useState} from "react";
import Link from "next/link";

import '../styles/bootstrap.sass';
import Cookies from "universal-cookie";
import {useRouter} from "next/router";

const cookies = new Cookies();

const TitleBar = ({ breadcrumbs }) => {
    const token = cookies.get('token');
    const isLoggedIn = token != null;
    const [menuOpen, setMenuState] = useState(false);
    const router = useRouter();

    const switchToDark = () => {
        cookies.set('theme', 'dark');
        router.reload();
    };

    const switchToAuto = () => {
        cookies.remove('theme');
        router.reload();
    };

    const switchToLight = () => {
        cookies.set('theme', 'light');
        router.reload();
    };

    const hours = new Date().getHours();
    const isDayTime = hours > 6 && hours < 20;

    const renderDropdownMenu = () => (
      <div id="topbar-dropdown">
          <img alt="user-icon" id="menu-user-icon" src={require('../images/icons/user.png')} onClick={() => setMenuState(!menuOpen)}/>
          {
              menuOpen ?
                  <div className="menu card-shadow" onfocusout={() => setMenuState(false)}>
                      <div className="d-flex justify-content-center align-items-center">
                          {
                              cookies.get('theme') === "dark" || !isDayTime && cookies.get('theme') === undefined ?
                                  <div className="link" onClick={switchToLight}><a><img src={require('../images/icons/sun.png')} /></a></div> :
                                  <div className="link" onClick={switchToDark}><a><img src={require('../images/icons/moon.png')} /></a></div>
                          }
                          {
                              cookies.get('theme') !== undefined ?
                                  <div className="link" onClick={switchToAuto}><a><img src={require('../images/icons/auto.png')} /></a></div>
                                  : null
                          }
                      </div>
                      <hr style={{ margin: "0.25rem"}} />
                      <div className="link"><Link href="/dashboard"><a>Dashboard</a></Link></div>
                      <div className="link"><Link href="/profile/edit-profile"><a>Profile</a></Link></div>
                      <div className="link"><Link href="/logout"><a>Logout</a></Link></div>
                  </div> : null
          }

      </div>
    );

    return <React.Fragment>
        <nav id="titlebar">
            <div className="row m-0">
                <div className="col-lg-2 col-md-3 col-8 d-flex align-items-center">
                    <Link href="/dashboard"><img alt="vidyut-text-logo" id="vidyut-logo-topbar" src={require('../images/logos/vidyut-dark-logo.png')} /></Link>
                </div>
                <div className="col text-right">
                    {
                        isLoggedIn ?
                            renderDropdownMenu()
                            :  <Link href="/login"><a>Login</a></Link>
                    }
                </div>
            </div>
        </nav>
        {
            breadcrumbs ?
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb rounded-0 card-shadow">
                    <Link href="/dashboard">
                            <li className="breadcrumb-item" aria-current="page">Dashboard</li>
                    </Link>
                    {
                        breadcrumbs.length > 0 ? breadcrumbs.map(l => (
                            <Link href={l.link}>
                                    <li className="breadcrumb-item" aria-current="page">{l.name}</li>
                            </Link>
                        )) : null
                    }
                    </ol>
                </nav> : null
        }
    </React.Fragment>
};

export default TitleBar;