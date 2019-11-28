import React from 'react'
import Webcam from "react-webcam";

import TitleBar from "../../components/titleBar";
import Base from "../../components/base";

const AcceptPayment = () => {

    return <Base loginRequired>
        <TitleBar/>
        <Webcam
            screenshotFormat="image/jpeg"
            height={720}
            videoConstraints={{
                facingMode: { exact: "environment" }
            }}
        />
    </Base>
};

export default AcceptPayment;