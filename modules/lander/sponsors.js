import React from "react";
import '../../styles/lander/sponsors.sass';

const LanderSponsors = () => {

    return (
        <section id="lander-sponsors" className="d-flex align-items-center justify-content-center">
            <div className="container">
                <div className="row m-0 w-100">
                    <div className="col-md-8 px-0 pb-2">
                        <div className="sponsor-card animated slideInLeft h-100">
                            <h4>Our Sponsors</h4>
                            <div className="row mx-0 mt-2">
                                <div className="col-md-4 animated fadeIn delay-1s col-6 p-2">
                                    <a href="https://amfoss.in">
                                        <img
                                            src={require('../../images/logos/amfoss_logo_light.png')}
                                            style={{
                                                filter: 'brightness(0) contrast(0.2)'
                                            }}
                                        />
                                    </a>
                                    <div className="title">Technology Partner</div>
                                </div>
                                <div className="col-md-4 animated fadeIn delay-1s col-6 p-2">
                                    <a href="https://acrd.org.in">
                                        <img
                                            src={require('../../images/logos/acrd-logo.jpg')}
                                        />
                                    </a>
                                    <div className="title">Payment Partner</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 px-0 px-md-2 d-flex align-items-center">
                        <div className="sponsor-intent mx-4 text-center text-md-left mt-md-0 ">
                            <h3 className="animated flipInX">Showcase your brand at Vidyut 2020</h3>
                            <div className="animated fadeIn">
                                Find our sponsorship brochure <a href="http://bit.ly/vidyut-sponsor-brochure">here</a>.
                                Interested in becoming a sponsor?
                                Email us at <a href="mailto:vidyut@am.amrita.edu"> vidyut@am.amrita.edu</a>.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LanderSponsors;
