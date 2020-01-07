import React from "react";
import LanderCover from "../modules/lander/cover";
import Base from "../components/base";
import LanderCountdown from "../modules/lander/countdown";

const LandingPage = () => {

    return <Base>
            <LanderCover  />
            <LanderCountdown />
    </Base>

};

export default LandingPage;