import React from "react";
import '../styles/loadingscreen.sass';

const LoadingScreen = ({ title, text }) => {
    return <div id="loading-screen">
        <div className="h-100 d-flex justify-content-center align-items-center bg-gradient">
            <div className="loading-details-container text-light p-4">
                <img alt="vidyut-logo" src={require('../images/logos/Vlogo.png')} className="loading-image" />
                <h4>{ title ? title : "Loading" }</h4>
                <p>{text}</p>
            </div>
        </div>
    </div>
};

export default LoadingScreen;