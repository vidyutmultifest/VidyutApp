import React from "react";
import '../styles/loadingscreen.sass';

const LoadingScreen = ({ text }) => {
    return <div id="loading-screen">
        <div className="h-100 d-flex justify-content-center align-items-center bg-gradient">
            <div className="loading-details-container text-light p-4">
                <h4>Loading</h4>
                <p>{text}</p>
            </div>
        </div>
    </div>
};

export default LoadingScreen;