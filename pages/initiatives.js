import Base from "../components/base";
import Head from "next/head";
import React from "react";

import '../styles/initiatives.sass';
import Topbar from "../components/common/topbar";
import MenuBar from "../components/common/menubar";

const InitiativesPage = () => {

    return <Base>
        <Head>
            <title>Vidyut Initiatives | Vidyut - National Level Multi Fest | Amrita Vishwa Vidyapeetham, Amritapuri</title>
        </Head>
        <Topbar/>
        <MenuBar/>
        <div id="initiatives-page">
            <section id="vsf">
                <div className="row m-0">
                    <div className="col-md-8">
                        <h2>Vidyut Social Forum</h2>
                        <p>
                            Amrita University has been ever-present in the sector of social work, inspired by our compassionate
                            leader figure, Mata Amritanandamayi. The students of Amrita Vishwa Vidyapeetham are no strangers to
                            social responsibility and are always inclined to lend a helping hand to the needy ones.
                        </p>
                        <p>
                            Vidyut Social Forum, an initiative of Vidyut 2020, integrates with the consistent effort of the
                            students and faculty of the Amritapuri campus to offer social services such as medical campaigns,
                            blood donation, hair donation, and palliative care. The campus offers 4000+ healthy blood and hair
                            donors. The team of VSF plan on making collaborations with AIMS, Amrita Ayurveda College and Amrita
                            Cancer Centre to ensure bonafide treatments and care. VSF is a work in progress that intends on
                            reaching new heights in the future.
                        </p>
                        <p>
                            We are eagerly looking forward to in the future for the
                            betterment of the society and to take our initiative 'VSF' to greater heights. We wish to lead the
                            disadvantaged from darkness to light; to provide the destitute with a new life force; to be the
                            light and force of life itself.
                        </p>
                    </div>
                </div>
            </section>
            <section id="fishermen">
                <div className="row m-0">
                    <div className="col-md-6">
                        <div className="row m-0">
                            <div className="col-6 p-2">
                                <img src={require('../images/aoc/fishermen_2.JPG')} />
                            </div>
                            <div className="col-6 p-2">
                                <img src={require('../images/aoc/fishermen_1.JPG')} />
                            </div>
                            <div className="col-12 p-2">
                                <img src={require('../images/aoc/fishermen_3.JPG')} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-center">
                        <div>
                            <h4>Vidyut 2019</h4>
                            <h2>Honoring Fishermen, Kerala's new Army.</h2>
                            <p>
                                Every fisherman knows that the sea is dangerous and the storms are terrible,
                                but never found these dangers as a sufficient reason for remaining ashore. In the moment
                                of crisis, these new heroes were the prominent ones who came out to help.
                            </p>
                            <p>
                                Thousands of calls and messages ushered into the control rooms... all of them were cries
                                for help... When time was at its crucial moment, the journey for the rescue mission was
                                commenced without hesitation. The situation worsened at one point, but that didn't stop
                                them from saving those marooned in the floods, rushing to help those in need. The
                                benevolence of the sons of sea rendered everyone speechless.
                            </p>
                            <p>
                                Like the salt in the ocean, their care, compassion, and love present in their hearts were
                                seen throughout their actions. Their empathy gained them admiration and felicitation from
                                all over the world. Truly at that moment, they were the saviours of this century's
                                most catastrophic flood.
                            </p>
                            <p>
                                Like a Phoenix from the ashes, Kerala rose from the great flood that engulfed her and she
                                stood on the shoulders of the sons of sea, who provided support and service to the poor
                                souls in plight. As a token of gratitude the brave hearts of flood times i. e the fishermen
                                were felicitated and acknowledged during  the eve of Vidyut 2019, in the esteemed
                                presence of the Actor Bala.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </Base>
};
export default InitiativesPage;