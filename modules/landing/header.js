import React from 'react'
import Tilt from 'react-parallax-tilt';


const LandingHeader = () => {

    return  <div>
        <div
            id="theme-logo-container"
            className="d-flex p-4"
        >
            <img src={require('../../images/logos/heal-the-world-light.png')} className="logo" />
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