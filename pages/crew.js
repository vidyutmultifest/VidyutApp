import TitleBar from "../components/titleBar";
import DashboardFooter from "../modules/dashboard/footer";
import Base from "../components/base";
import React from "react";


const CrewPage = () => {

    return (
        <Base>
            <TitleBar />
            <img src={require('../images/aoc/crew.jpg')} />
        </Base>
    )
};

export default CrewPage;