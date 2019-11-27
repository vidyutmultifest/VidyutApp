import React from "react";

const AboutVidyut = () => (
    <section id="about-vidyut">
        <div className="row m-0">
            <div className="col-lg-6 order-2 order-lg-1">
                <div className="d-flex my-4 h-100 w-100 justify-content-center align-items-center">
                    <div id="moments-slider" className="row mx-0 my-4">
                        <div className="col-4">
                            <video loop muted autoPlay><source src={require('../../videos/moment/1.mp4')} type="video/mp4" /></video>
                        </div>
                        <div className="col-4">
                            <video loop muted autoPlay><source src={require('../../videos/moment/2.mp4')} type="video/mp4" /></video>
                        </div>
                        <div className="col-4">
                            <video loop muted autoPlay><source src={require('../../videos/moment/3.mp4')} type="video/mp4" /></video>
                        </div>
                        <div className="col-4">
                            <video loop muted autoPlay><source src={require('../../videos/moment/4.mp4')} type="video/mp4" /></video>
                        </div>
                        <div className="col-4">
                            <video loop muted autoPlay><source src={require('../../videos/moment/5.mp4')} type="video/mp4" /></video>
                        </div>
                        <div className="col-4">
                            <video loop muted autoPlay><source src={require('../../videos/moment/6.mp4')} type="video/mp4" /></video>
                        </div>
                        <div className="col-4">
                            <video loop muted autoPlay><source src={require('../../videos/moment/7.mp4')} type="video/mp4" /></video>
                        </div>
                        <div className="col-4">
                            <video loop muted autoPlay><source src={require('../../videos/moment/8.mp4')} type="video/mp4" /></video>
                        </div>
                        <div className="col-4">
                            <video loop muted autoPlay><source src={require('../../videos/moment/9.mp4')} type="video/mp4" /></video>
                        </div>
                        <div className="col-4">
                            <video loop muted autoPlay><source src={require('../../videos/moment/10.mp4')} type="video/mp4" /></video>
                        </div>
                        <div className="col-4">
                            <video loop muted autoPlay><source src={require('../../videos/moment/11.mp4')} type="video/mp4" /></video>
                        </div>
                        <div className="col-4">
                            <video loop muted autoPlay><source src={require('../../videos/moment/12.mp4')} type="video/mp4" /></video>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 p-4 d-flex align-items-center">
                <div>
                    <h3>
                        <span>Vidyut</span>
                        India's Largest<br/> National-Level Multifest
                    </h3>
                    <div>
                        <p>
                            A fest which comes to life when the various universities under the
                            Amrita tag join hands together, Vidyut is nothing like the fests
                            you’ll ever see anywhere else. Rightly called a multi-fest, it
                            brings with it colour and a whole lot of energy and it’s all done
                            for and by the students to enjoy. Vidyut, is less of a fest and
                            more of a festival of sorts, for we do not just organise the fest,
                            we celebrate it!
                        </p>
                        <p>
                            From delicious, mouth-watering food in the stalls to players giving
                            their all in the grounds, from mesmerising voices taking you to a
                            whole new world with their songs to dancers so energetic that even
                            the most awkward and introverted kid starts to shake a leg, from
                            talks by accomplished intellectuals to shows by some of the most
                            prolific bands performing on stage, there’s nothing you can’t find
                            happening here. You name it, we will have it. We can bet on it.
                            Got a thing for debates? Or maybe you wanted to learn how you could
                            build a robot at home? Or maybe you’re just competitive and like
                            showing off your vast knowledge on astronomy, WE HAVE EVERYTHING!
                        </p>
                        <p>
                            A three-day show, there’s always something to do, something to
                            watch and something to take part in. Once the show goes on the road,
                            there’s no stopping it and all that happens is for you and only you!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default AboutVidyut;