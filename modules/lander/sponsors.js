import React from "react";
import '../../styles/lander/sponsors.sass';

const LanderSponsors = () => {

    const sponsors = [
        {
            "logo": require('../../images/sponsors/milma.jpg'),
            "name": "Milma",
            "type": "Event Partner"
        },
        {
            "logo": require('../../images/sponsors/hyndai.png'),
            "name": "Hyundai",
            "type": "Event Partner"
        },
        {
            "logo": require('../../images/sponsors/zebronics.png'),
            "name": "Zebronics",
            "type": "Gadget Partner"
        },
        {
            "logo": require('../../images/sponsors/raviz.png'),
            "name": "Raviz",
            "type": "Hospitality Partner"
        },
        {
            "logo": require('../../images/sponsors/myg.jpg'),
            "name": "MyG",
            "type": "Technology Partner"
        },
        {
            "logo": require('../../images/sponsors/carnival.jpg'),
            "name": "Carnival Cinemas",
            "type": "Coupon Partner"
        },
        {
            "logo": require('../../images/sponsors/udaya-samudra.jpg'),
            "name": "Udaya Samudra",
            "type": "Event Partner"
        },
        {
            "logo": require('../../images/sponsors/vimukthi.png'),
            "name": "Vimukthi",
            "type": "Awareness Partner"
        },
        {
            "logo": require('../../images/logos/acrd-logo.jpg'),
            "name": "ACRD",
            "type": "Payment Partner"
        }
    ];

    return (
        <section id="lander-sponsors" className="d-flex align-items-center justify-content-center">
            <div className="container">
                <div className="row m-0 w-100">
                    <div className="col-md-8 px-0 pb-2">
                        <div className="sponsor-card text-dark animated slideInLeft h-100">
                            <h4>Our Sponsors</h4>
                            <div className="row mx-0 mt-2">
                                {
                                    sponsors.map(s =>
                                        <div className="col-md-3 animated fadeIn delay-1s col-6 p-2">
                                            <div className="d-flex align-items-center h-100">
                                                <div>
                                                    <img
                                                        alt={s.name}
                                                        src={s.logo}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 px-0 px-md-2 d-flex align-items-center">
                        <div className="sponsor-intent text-dark mx-4 text-center text-md-left mt-md-0 ">
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
