import React, { useState } from "react";
const shortid = require('shortid');
import Link from "next/link";

import '../styles/bootstrap.sass';
import '../styles/style.sass';
import Cookies from "universal-cookie";
import {useRouter} from "next/router";
const classNames = require('classnames');
import posed, { PoseGroup } from 'react-pose';
import DropdownMenu from "./dropdownMenu";

const cookies = new Cookies();

const TitleBar = ({ breadcrumbs, hideUserDropdown, hideLogo, className, style }) => {
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

    const Shade = posed.div({
        enter: { opacity: 1, delay: 300, delayChildren: 500, ease: 'anticipate' },
        exit: { opacity: 0 },
    });


    const renderMenuItems = (items) => <div className="row m-0 p-2 w-100">
    {
        mainMenuOpen ? items.map(i => (
                <div className="col-6 col-md-4 col-lg-3 text-left p-2">
                <div className="menu-section-title">{i.title}</div>
                <div className="menu-items">
                {
                    i.items && i.items.map(j => (
                        <Link href={j.link}>
                            <div>
                                <a href={j.link} target={i.newTab ? '__blank' : null}>{j.name}</a>
                            </div>
                        </Link>
                    ))
                }
                </div>
            </div>
        )) : null
    }
    </div>;

    const handleLogout = () => {
        cookies.remove('token');
        cookies.remove('refreshToken');
        cookies.remove('username');
        cookies.remove('transactionID');
        localStorage.clear();
        router.push('/');
    };

    const dropdownMenu = menuOpen ?
        <div className="dropdown-menu card-shadow" onfocusout={() => setMenuState(false)}>
            {/*<div className="d-flex justify-content-center align-items-center">*/}
            {/*    {*/}
            {/*        cookies.get('theme') === "dark" || !isDayTime && cookies.get('theme') === undefined ?*/}
            {/*            <div className="link" onClick={switchToLight}><a><img src={require('../images/icons/sun.png')} /></a></div> :*/}
            {/*            <div className="link" onClick={switchToDark}><a><img src={require('../images/icons/moon.png')} /></a></div>*/}
            {/*    }*/}
            {/*    {*/}
            {/*        cookies.get('theme') !== undefined ?*/}
            {/*            <div className="link" onClick={switchToAuto}><a><img src={require('../images/icons/auto.png')} /></a></div>*/}
            {/*            : null*/}
            {/*    }*/}
            {/*</div>*/}
            {/*<hr style={{ margin: "0.25rem"}} />*/}
            <div className="link"><Link href="/explore"><a>Dashboard</a></Link></div>
            <div className="link"><Link href="/profile/edit-profile"><a>Profile</a></Link></div>
            <div className="link" onClick={handleLogout}><a>Logout</a></div>
        </div> : null;

    const menuItems = [
        {
            title: "About",
            items: [
                {
                    name: "About Vidyut",
                    link: '/'
                },
                {
                    name: "About Amrita",
                    link: 'https://amrita.edu',
                    newTab: true,
                },
                {
                    name: "Initiatives",
                    link: '/initiatives'
                },
                {
                    name: "Crew",
                    link: '/crew'
                },
            ]
        },
        {
            title: "Events",
            items: [
                {
                    name: "Competitions",
                    link: '/competitions'
                },
                {
                    name: "Workshops",
                    link: '/workshops'
                },
                {
                    name: "Shows",
                    link: '/shows'
                },
                {
                    name: "Brochure",
                    link: 'http://bit.ly/vidyut-brochure',
                    newTab: true
                },
            ]
        },
        {
            title: "Registration",
            items: [
                {
                    name: "Dashboard",
                    link: '/dashboard'
                },
                {
                    name: "Support",
                    link: 'https://t.me/vcare2020',
                    newTab: true
                },
                {
                    name: "FAQ",
                    link: '/faq'
                },
            ]
        },
    ];

    const [itemOpen, setItemOpen] = useState();

    const desktopmenu = <div className="d-md-inline-flex d-none">
        {
            menuItems.map((s,i) =>
                <DropdownMenu
                    key={shortid.generate()}
                    item={s}
                    isOpen={itemOpen === i}
                    onClick={() => setItemOpen( itemOpen !== i ?  i : null)}
                />
            )
        }
    </div>;

    const menu = mainMenuOpen ? <div className="topbar-menu">
        <div className="close-button" onClick={() => setMainMenuState(false)}>
            <img
                alt="close menu"
                src={require('../images/icons/cross-icon-white.png')}
                style={{
                    width: "45px"
                }}
            />
        </div>
        <h3 className="menu-title">
            <img src={require('../images/logos/Vlogo.png')} />
            Menu
        </h3>
        <div className="container h-100 d-flex align-items-center p-2">
                {renderMenuItems(menuItems)}
        </div>
        <div className="social-media-links">
            <a href="https://facebook.com/Vidyut.Multifest">
                <img src={require('../images/icons/facebook.png')} />
            </a>
            <a href="https://instagram.com/VidyutMultifest">
                <img src={require('../images/icons/instagram.png')} />
            </a>
            <a href="https://twitter.com/VidyutMultifest/">
                <img src={require('../images/icons/twitter.png')} />
            </a>
        </div>
    </div> : null;

    return <React.Fragment>
        <nav id="titlebar" style={style} className={className}>
            <div className="row m-0">
                <div className="col-lg-2 col-md-3 col-8 d-flex align-items-center">
                    {
                        !hideLogo ?
                            <Link href="/explore">
                                <a href="/explore">
                                    <img
                                        alt="vidyut-text-logo"
                                        id="vidyut-logo-topbar"
                                        src={require('../images/logos/vidyut-dark-logo.png')}
                                    />
                                </a>
                            </Link> : null
                    }
                </div>
                <div className="col-lg-10 col-md-9 col-4 p-0 text-right">
                    <div className="d-inline">
                        { desktopmenu }
                        {  isLoggedIn ? <div className="d-inline">
                                    <div id="topbar-dropdown">
                                        <img alt="user-icon" id="menu-user-icon" src={require('../images/icons/user.png')} onClick={() => setMenuState(!menuOpen)}/>
                                        { dropdownMenu }
                                    </div>
                                </div>
                                :   <Link href="/login"><a>
                                    <div id="topbar-dropdown">
                                        <img alt="user-icon" id="menu-user-icon" src={require('../images/icons/user.png')} />
                                    </div>
                                </a></Link>
                        }
                        <div id="topbar-menu">
                            <img alt="menu-icon" id="menu-icon" src={require('../images/icons/menu-icon-hamburger.png')} onClick={() => setMainMenuState(true)}/>
                            <PoseGroup>
                                {
                                    mainMenuOpen ?
                                        <Shade key="menu-open">{ menu }</Shade> : null
                                }
                            </PoseGroup>
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
                            style={{ lineHeight: 1 }}
                            aria-current="page"
                        >
                            <img src={require('../images/icons/home-icon.png')} className="icon-img" style={{ height: "2vw", minHeight: "20px", maxHeight: "1rem" }} />
                        </a>
                    </Link>
                    {
                        breadcrumbs.length > 0 ? breadcrumbs.map(l => (
                            <Link href={l.link} key={shortid.generate()}>
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