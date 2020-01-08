import React from "react";
import '../../styles/lander/aboutvidyut.sass';
import CountUp from 'react-countup';

const LanderAboutVidyut = () => {

    return (
        <section id="about-vidyut" className="d-flex align-items-center">
            <div className="container content-wrapper">
                <div className="row m-0">
                    <div className="col-md-4 px-2 order-md-1 order-2">
                        <div className="row m-0">
                            <div className="col-md-12 col-6 p-3">
                                <div>
                                    <div className="counter-value" style={{ color: "#01579B"}}>
                                        <CountUp
                                            end={20}
                                            suffix="k"
                                            duration={5}
                                        />
                                    </div>
                                    <div className="counter-label">Footfall</div>
                                </div>
                            </div>
                            <div className="col-md-12 col-6 p-3">
                                <div>
                                    <div className="counter-value" style={{ color: "#F50057"}}>
                                        <CountUp
                                            end={15}
                                            suffix="Lakhs"
                                            useEasing
                                            duration={5}
                                        />
                                    </div>
                                    <div className="counter-label">Worth Prizes</div>
                                </div>
                            </div>
                            <div className="col-md-12 col-6 p-3">
                                <div>
                                    <div className="counter-value" style={{ color: "#00C853"}}>
                                        <CountUp
                                            end={30}
                                            suffix="+"
                                            useEasing
                                            duration={5}
                                        />
                                    </div>
                                    <div className="counter-label">Competitions</div>
                                </div>
                            </div>
                            <div className="col-md-12 col-6 p-3">
                                <div>
                                    <div className="counter-value" style={{ color: "#E65100"}}>
                                        <CountUp
                                            end={20}
                                            duration={5}
                                            useEasing
                                            suffix="+"
                                        />
                                    </div>
                                    <div className="counter-label">Workshops</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 order-md-2 order-1 d-flex align-items-center">
                        <div>
                            <h3 className="animated fadeIn">About Vidyut</h3>
                            <div className="animated tagline zoomIn">
                                When India’s brilliant young minds come together,<br /> be in their focus
                            </div>
                            <p className="d-block d-md-none animated fadeInRight">
                                Vidyut is the annual multifest organized jointly by the 6 multi-disciplinary
                                schools of Amrita Vishwa Vidyapeetham, Amritapuri Campus.  Through various competitions,
                                hands-on trainings, workshops, talks, discussions, symposia and cultural events,
                                Vidyut facilitates a forum for young minds, inspiring them to contribute creatively
                                to integrate knowledge and talent.
                            </p>
                            <p className="d-none d-md-block animated fadeInRight">
                                Started in 2012, Vidyut is a national level inter-collegiate multi-fest,
                                organized by the students of Amrita Vishwa Vidyapeetham. Through
                                various competitions, hands-on trainings, workshops, discussions,
                                symposia and cultural events, Vidyut facilitates a forum for young minds,
                                inspiring them to contribute creatively to integrate knowledge and talent.
                                Vidyut aims to turn the world into a better, inclusive and harmonious
                                place for all living beings and nature, because the future depends on this
                                integration. Saving our planet starts with the willingness to do something
                                to change the world, even if just in a tiny way. There is a power in numbers,
                                but it needs a few of us to step up to take the lead and that is what we
                                plan to do, step up. Vidyut 2020 aims to offer a strategic
                                way to help the ailing World, and thus the theme ‘HEAL THE WORLD’
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

};

export default LanderAboutVidyut;