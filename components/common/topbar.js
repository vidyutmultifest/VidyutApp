import React from "react";
import '../../styles/common/topbar.sass';

const Topbar = () => {
    return (
        <div id="topbar" className="d-none d-md-block">
            <div className="container">
                <div className="d-flex justify-content-end">
                    <div className="topbar-social-media-icons">
                        <a href="https://facebook.com/Vidyut.Multifest">
                            <img src={require('../../images/icons/facebook.png')} alt="Vidyut Facebook Profile" />
                        </a>
                        <a href="https://instagram.com/VidyutMultifest">
                            <img src={require('../../images/icons/instagram.png')} alt="Vidyut Instagram Profile" />
                        </a>
                        <a href="https://twitter.com/VidyutMultifest">
                            <img src={require('../../images/icons/twitter.png')}  alt="Vidyut Twitter Profile" />
                        </a>
                    </div>
                    <div className="topbar-quick-actions">
                        <a href="/help">Support</a>
                        <a href="/profile/edit-profile">Edit Profile</a>
                        <a href="/logout">Logout</a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Topbar;