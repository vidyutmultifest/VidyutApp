import React from "react";
import '../../styles/lander/healtheworld.sass';

const LanderHealTheWorld = () => {

    return (
        <section id="about-heal-the-world" className="d-flex align-items-center">
            <div className="container p-0">
                <div className="row m-0">
                    <div className="col-md-8 d-flex align-items-center order-lg-1 order-2">
                        <div>
                            <h3 className="animated fadeIn">Our Theme</h3>
                            <div className="animated tagline zoomIn">
                                Heal the World
                            </div>
                            <p className="animated fadeInRight">
                                In spite of the economic and technological progress, humanity
                                is badly in need of healing, and young minds, who are the future
                                of the world, are better poised to offer solutions to heal humanity.
                                Vidyut, where the youth converge every year, provides an open
                                forum for the exchange of ideas to make the world a better
                                place, where every living being can enjoy coexistence in peaceful
                                harmony. This holistic future needs the convergence of thinking
                                in science, technology, humanities, arts, management etc.
                                The confluence of every thought stream, for a better world...
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4 order-1 order-lg-2 py-2 d-flex align-items-center justify-content-center">
                        <img className="earth-icon" src={require("../../images/lander/earth.png")} />
                    </div>
                    <div className="col-12 order-3 text-center py-md-4 d-flex justify-content-center">
                        <div>
                            <h4>Core Focus Areas</h4>
                            <div className="focus-areas row m-0">
                                <div className="col-6 animated slideInLeft col-lg-4 p-2">
                                    <div className="focus-card animated zoomIn p-2">
                                        <span>Societal Transformation</span>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-4 p-2">
                                    <div className="focus-card animated fadeInUp  p-2">
                                        <span>Environment Care</span>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-4  p-2">
                                    <div className="focus-card animated zoomIn p-2">
                                        <span>Science & Technology</span>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-4  p-2">
                                    <div className="focus-card animated fadeInUp  p-2">
                                        <span>Arts & Culture</span>
                                    </div>
                                </div>
                                <div className="col-6  col-lg-4  p-2">
                                    <div className="focus-card animated zoomIn p-2">
                                        <span>Speak to Heal the World</span>
                                    </div>
                                </div>
                                <div className="col-6  col-lg-4  p-2">
                                    <div className="focus-card animated fadeInUp p-2">
                                        <span>Economics for Sustainable Prosperity</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LanderHealTheWorld;