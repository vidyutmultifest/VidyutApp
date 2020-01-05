import React, { useState } from "react";
import Link from "next/link";

import '../styles/bootstrap.sass';
import '../styles/style.sass';
import Cookies from "universal-cookie";
import {useRouter} from "next/router";
const classNames = require('classnames');

const cookies = new Cookies();

const TitleBar = ({ breadcrumbs, hideUserDropdown }) => {
    const token = cookies.get('token');
    const isLoggedIn = token != null;
    const [menuOpen, setMenuState] = useState(false);
    const [mainMenuOpen, setMainMenuState] = useState(false);
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

    const renderMenuItems = (items) => <div className="row m-0">
    {
        items.map(i => (
            <div className="col-md-4 col-lg-3 p-2">
                <Link href={i.link}>
                    <a href={i.link}>
                        <div className="card-shadow text-center p-md-4 p-2 rounded">
                            <div className="row m-0">
                                <div className="col-3 col-md-12 p-1">
                                    <img src={i.img} className="w-100"/>
                                </div>
                                <div className="col-9 col-md-12 d-flex align-items-center p-1">
                                    <div className="d-none d-md-block text-center w-100">
                                        <h4 className="m-0">{i.name}</h4>
                                    </div>
                                    <div className="d-block d-md-none text-left">
                                        <h4 className="m-0">{i.name}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </Link>
            </div>
        ))
    }
    </div>;

    const dropdownMenu = menuOpen ?
        <div className="dropdown-menu card-shadow" onfocusout={() => setMenuState(false)}>
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
        </div> : null;

    const menu = mainMenuOpen ? <div className="topbar-menu">
        <div className="close-button" onClick={() => setMainMenuState(false)}>
            <img
                alt="close menu"
                src={require('../images/icons/cancel.png')}
                style={{
                    width: "45px"
                }}
            />
        </div>
        <div className="container h-100 d-flex align-items-center p-2">
            <div className="row m-0 w-100">
                {renderMenuItems([
                    {
                        img: require('../images/icons/tickets-qa.png'),
                        name: "Shows",
                        link: '/shows'
                    },
                    {
                        img: require('../images/icons/trophy-events.png'),
                        name: "Competitions",
                        link: '/competitions'
                    },
                    {
                        img: require('../images/icons/classroom.png'),
                        name: "Workshops",
                        link: '/workshops'
                    },
                ])}
            </div>
        </div>
    </div> : null;

    return <React.Fragment>
        <nav id="titlebar">
            <div className="row m-0">
                <div className="col-lg-2 col-md-3 col-8 d-flex align-items-center">
                    <Link href="/dashboard">
                        <a href="/dashboard">
                            <img
                                alt="vidyut-text-logo"
                                id="vidyut-logo-topbar"
                                src={require('../images/logos/vidyut-dark-logo.png')}
                            />
                        </a>
                    </Link>
                </div>
                <div className="col-lg-10 col-md-9 col-4 p-0 text-right">
                    <div className="d-inline">
                        {
                             isLoggedIn ?
                                <div><div id="topbar-dropdown">
                                    <img alt="user-icon" id="menu-user-icon" src={require('../images/icons/user.png')} onClick={() => setMenuState(!menuOpen)}/>
                                    { dropdownMenu }
                                </div></div>
                                :   <Link href="/login"><a>
                                    <div id="topbar-dropdown">
                                        <img alt="user-icon" id="menu-user-icon" src={require('../images/icons/user.png')} />
                                    </div>
                                </a></Link>
                        }
                        <div id="topbar-menu">
                            <img alt="menu-icon" id="menu-icon" src={require('../images/icons/menu-icon-hamburger.png')} onClick={() => setMainMenuState(true)}/>
                            { menu }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        {
            breadcrumbs ?
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb rounded-0 card-shadow">
                    <Link href="/dashboard">
                        <a
                            href="/dashboard"
                            className="breadcrumb-item plain-link"
                            aria-current="page"
                        >
                            Dashboard
                        </a>
                    </Link>
                    {
                        breadcrumbs.length > 0 ? breadcrumbs.map(l => (
                            <Link href={l.link}>
                                    <a href={l.link} className={classNames("breadcrumb-item plain-link", l.active ? "active" : null)} aria-current="page">
                                        {l.name}
                                    </a>
                            </Link>
                        )) : null
                    }
                    </ol>
                </nav> : null
        }
    </React.Fragment>
};

export default TitleBar;