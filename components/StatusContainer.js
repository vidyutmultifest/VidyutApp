import React from "react";
import Lottie from 'react-lottie';

import '../styles/statuscontainer.sass';

const StatusContainer = ({ title, image, animation, text, buttons, style }) => (
    <div id="status-container" style={style} >
        <div>
            {
                animation ?
                    <Lottie
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: animation,
                        }}
                        height={400}
                        width={400}
                    />
                    : <img src={image} />
            }
            <h2>{title}</h2>
            <p>{text}</p>
            {buttons}
        </div>
    </div>
);

export default StatusContainer;