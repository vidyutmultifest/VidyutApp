import React from 'react'
import Tilt from 'react-parallax-tilt';
import Link from "next/link";


const LandingHeader = () => {

    return  <div>
        <div
            id="theme-logo-container"
            className="row m-0"
        >
            <div className="col-6 p-2">
                <img src={require('../../images/logos/heal-the-world-light.png')} className="logo" />
            </div>
            <div className="col-6 d-flex align-items-center justify-content-end p-4">
                <Link href="/dashboard"><a id="registration-button">Dashboard</a></Link>
            </div>
        </div>
        <div id="theme-landing">
            <Tilt
                glareEnable={true}
                tiltMaxAngleY={10}
                tiltMaxAngleX={10}
                glareMaxOpacity={0.3}
                glareColor="#ffffff"
                glarePosition="bottom"
                glareReverse
                gyroscope={true}
                scale={1}
            >
                <div
                    id="theme-pic"
                    style={{
                        backgroundImage: `url(${require('../../images/assets/landing_headers/before.jpg')})`,
                    }}
                />
            </Tilt>
        </div>
    </div>

};

export default LandingHeader;