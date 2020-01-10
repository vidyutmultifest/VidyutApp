import React from "react";
import '../styles/loadingscreen.sass';
import Link from "next/link";

const LoadingScreen = ({ title, text, showLinks }) => {
    return <div id="loading-screen">
        <div className="h-100 d-flex justify-content-center align-items-center bg-gradient">
            <div className="loading-details-container text-light p-4">
                <img alt="vidyut-logo" src={require('../images/logos/Vlogo.png')} className="loading-image" />
                <h4>{ title ? title : "Loading" }</h4>
                <p>{text}</p>
                {
                    showLinks ?
                        (
                            <React.Fragment>
                                <Link href="/">
                                    <a><div className="btn btn-light btn-shadow px-4 m-2 py-2">Home</div></a>
                                </Link>
                                <Link href="/dashboard">
                                    <a><div className="btn btn-light btn-shadow px-4 m-2 py-2">Dashboard</div></a>
                                </Link>
                            </React.Fragment>
                        ) : null
                }
            </div>
        </div>
    </div>
};

export default LoadingScreen;