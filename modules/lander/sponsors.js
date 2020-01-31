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
            "logo": require('../../images/sponsors/sbi.png'),
            "name": "SBI",
            "type": "Event Partner"
        },
        {
            "logo": require('../../images/sponsors/red_fm.jpg'),
            "name": "Red FM",
            "type": "Event Partner"
        },
        {
            "logo": require('../../images/sponsors/federal_bank.png'),
            "name": "Federal Bank",
            "type": "Event Partner"
        },
        {
            "logo": require('../../images/sponsors/zebronics.png'),
            "name": "Zebronics",
            "type": "Gadget Partner"
        },
        {
            "logo": require('../../images/sponsors/byjus.png'),
            "name": "Byjus",
            "type": "E-learning Partner"
        },
        {
            "logo": require('../../images/sponsors/hyndai.png'),
            "name": "Hyundai",
            "type": "Event Partner"
        },
        {
            "logo": require('../../images/sponsors/regant-lake-palace.jpg'),
            "name": "Regant Lake Palace",
            "type": "Hospitality Partner"
        },
        {
            "logo": require('../../images/sponsors/canara-bank.JPG'),
            "name": "Canara Bank",
            "type": "Technology Partner"
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
            "logo": require('../../images/sponsors/dominos.png'),
            "name": "Dominos",
            "type": "Event Partner"
        },
        {
            "logo": require('../../images/sponsors/chungath.png'),
            "name": "Chungath",
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
        },
        {
            "logo": require('../../images/sponsors/hotel-aryaas.jpg'),
            "name": "Hotel Aryaas",
            "type": "Event Partner"
        }
    ];

    return (
        <section id="lander-sponsors" className="d-flex align-items-center justify-content-center">
                <div className="sponsor-card text-dark animated slideInLeft h-100">
                    <h4>Our Sponsors</h4>
                    <div className="row mx-0 mt-2">
                        {
                            sponsors.map(s =>
                                <div className="col-lg-2 col-md-3 animated fadeIn delay-1s col-6 p-2">
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
        </section>
    );
};

export default LanderSponsors;
