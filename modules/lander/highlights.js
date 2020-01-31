import React from "react";
import '../../styles/lander/highlights.sass';

const LanderHighlights = () => {
    return (
        <section id="lander-highlights" className="h-100">
            <div className="w-100 h-100 wrapper d-flex  align-items-center text-center justify-content-center ">
                <div className="w-100">
                    <div>
                        <div className="animated flipInX">
                            <img src={require('../../images/logos/revel.png')} style={{ filter: 'invert(1)', width: '30vw', padding: '0.5rem' }}/>
                        </div>
                        <div className="d-flex justify-content-center w-100">
                            <span className="tagline animated slideInUp">
                                Ft. Sunburn, The Agam Band, The Mentalist + more
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
                                Sunburn
                            </div>
                        </div>
                    </div>
                    <div className="pt-1">
                        <a href="/dashboard">
                            <button>Book Tickets</button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default LanderHighlights;