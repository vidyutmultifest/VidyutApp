import React from "react";
import '../../styles/lander/highlights.sass';

const LanderHighlights = () => {
    return (
        <section id="lander-highlights" className="h-100">
            <div className="w-100 h-100 wrapper d-flex  align-items-center text-center justify-content-center ">
                <div className="w-100">
                    <div>
                        <h4 className="animated flipInX">Revel - Proshows</h4>
                        <div className="d-flex justify-content-center w-100">
                            <span className="tagline animated slideInUp">
                                Ft. Nucleya, The Agam Band, The Mentalist + more
                            </span>
                        </div>
                    </div>
                    <div className="details-box row m-0 w-100 d-none d-md-flex">
                        <div className="col-4 animated fadeInLeft">
                            <div className="date">Day 1 - Jan 30</div>
                            <div className="name">
                                Agam Band
                            </div>
                            <div className="name">
                                The Mentalist
                            </div>
                        </div>
                        <div className="col-4 animated fadeInDown">
                            <div className="date">Day 2 - Jan 31</div>
                            <div className="name">
                                Choreonite
                            </div>
                        </div>
                        <div className="col-4 animated fadeInRight">
                            <div className="date">Day 3 - Feb 01</div>
                            <div className="name">
                                Nucleya
                            </div>
                        </div>
                    </div>
                    <div className="pt-1">
                        <a href="show/revel-vidyut-proshow">
                            <button>Book Tickets</button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default LanderHighlights;