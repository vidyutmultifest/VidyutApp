import React, { Component } from "react";

import '../../styles/lander/cover.sass';
import TitleBar from "../../components/titleBar";
import Link from "next/link";

class LanderCover extends Component  {

    render() {
        return (
            <section id="lander-cover">
                <TitleBar className="dark-theme" hideLogo />
                <div className="title-container">
                    <img id="cover-multifest-img" src={require('../../images/lander/sample-cover-image.png')} />
                    <div className="cover-el">
                        <img id="cover-el-1" src={require('../../images/lander/elements/Shape-Cross.svg')} />
                        <img id="cover-el-2" src={require('../../images/lander/elements/Shape-Cross.svg')} />
                        <img id="cover-el-3" src={require('../../images/lander/elements/Shape-Cross.svg')} />
                        <img id="cover-el-4" src={require('../../images/lander/elements/Shape-Oval.svg')} />
                        <img id="cover-el-5" src={require('../../images/lander/elements/Shape-Oval.svg')} />
                        <img id="cover-el-6" src={require('../../images/lander/elements/Shape-Oval.svg')} />
                        <img id="cover-el-7" src={require('../../images/lander/elements/Shape-Polygon.svg')} />
                        <img id="cover-el-8" src={require('../../images/lander/elements/Shape-Polygon.svg')} />
                        <img id="cover-el-9" src={require('../../images/lander/elements/Shape-Polygon.svg')} />
                        <img id="cover-el-10" src={require('../../images/lander/elements/Shape-Triangle.svg')} />
                        <img id="cover-el-11" src={require('../../images/lander/elements/Shape-Triangle.svg')} />
                        <img id="cover-el-12" src={require('../../images/lander/elements/Shape-Triangle.svg')} />
                        <img id="cover-el-13" src={require('../../images/lander/elements/Shape-Cross.svg')} />
                        <img id="cover-el-14" src={require('../../images/lander/elements/Shape-Triangle.svg')} />
                        <img id="cover-el-15" src={require('../../images/lander/elements/Shape-Oval.svg')} />
                        <img id="cover-el-16" src={require('../../images/lander/elements/Shape-Polygon.svg')} />
                    </div>
                    <div id="cover-title">
                        <img id="cover-campus-img" src={require('../../images/lander/campus-illus.png')} />
                        <img id="cover-heal-the-world-icon" src={require('../../images/lander/heal-the-world-light.png')} />
                        <div className="d-flex justify-content-center">
                            <div style={{ marginBottom: "3vh" }}>
                                <div id="cover-vidyut-icon" >
                                    <img src={require('../../images/lander/v-icon.png')} />
                                </div>
                                <img id="cover-vidyut-logo" src={require('../../images/lander/vidyut-logo.png')} />
                            </div>
                        </div>
                        <div data-text="MULTIFEST" className="glitch multifest-text">Multifest</div>
                        <div className="dates">January 31 - February 1</div>
                        <Link href="/dashboard">
                            <a href="/dashboard">
                                <button id="register-button">Register Now</button>
                            </a>
                        </Link>
                    </div>
                </div>
            </section>
        );
    }
}

export default LanderCover;