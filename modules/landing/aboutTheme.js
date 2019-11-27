import React from "react"

const AboutTheme = () => (
    <section id="about-theme">
        <div className="row m-0">
            <div className="col-lg-8 p-4">
                <h3>
                    <span>Heal the World</span>
                    ALL HANDS-ON DECK FOR THE REVIVAL OF OUR MOTHER!
                </h3>
                <p>
                    A world in tatters is no world to live in. A broken world is no world enjoyable.
                    It’s not enough to just exist and survive but that is how it is right now, and
                    the only ones who can save our ailing Mother is our youth! This is exactly why Vidyut
                    brings together with it not just fun and plays but also a lesson for all to learn.
                    A fest cannot happen with just two hands and one mind working for it.
                    This isn’t a one man show.
                </p>
                <p>
                    Similarly, the world cannot be brought back to life with just a few of us.
                    It needs all of us to put our heart and soul to revive it and that is exactly
                    what we plan to do.
                </p>
                <p>
                    We have a vision, a vision where all are one and holding hands, fighting
                    for all that’s right. And what can be closer to serving justice than bringing
                    the planet back from this environmental crisis.
                </p>
            </div>
            <div className="col d-flex align-items-center">
                <img className="earth-icon" src={require("../../images/assets/earth.png")} />
            </div>
        </div>

    </section>
);

export default AboutTheme;