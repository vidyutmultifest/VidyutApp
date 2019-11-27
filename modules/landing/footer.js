import React from 'react';

const Footer = () => {
    const footerMenu = (
        <div className="row mx-0 my-4">
            <div className="col-lg-4 py-4">
                <img src={require('../../images/logos/amrita-dark-logo.png')} />
            </div>
            <div className="col-lg-4 py-4">
                <div>
                    <img src={require('../../images/logos/vidyut-dark-logo.png')} />
                </div>
            </div>
            <div className="col-lg-4 py-4">
                <div className="simple-nav">
                    <a href="#">FAQ</a>
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                    <a href="#">Code of Conduct</a>
                    <a href="#">Helpdesk</a>
                </div>
            </div>
        </div>
    )

    return (
        <div id="footer-menu">
            <div className="pyramid-wrapper">
                <img src={require('../../images/assets/pyramids.png')} className="pyramid-bg" />
            </div>
            <footer>
                {footerMenu}
            </footer>
        </div>
    )
};

export default Footer;