import React from "react";

const AboutAmrita = () => (
    <section id="about-amrita">
        <div className="row m-0">
            <div className="col order-2 order-lg-1">
                <img src={require("../../images/assets/amrita_info.jpg")} />
            </div>
            <div className="col-lg-6 order-1 order-lg-2 p-4">
                <h3>
                    <span>India's Leading University</span>
                    Amrita Vishwa Vidyapeetham
                </h3>
                <div>
                    <p>Amrita Vishwa Vidyapeetham was granted Deemed to be University status by
                        UGC in 2003 at which time we had only 1,260 students and 200 faculty. Today we
                        are educating a vibrant student population of over 20,250 with 1700 faculty, offering
                        more than 250 UG, PG, and Ph.D. programs in Engineering, Management,
                        Medical Sciences (including Dentistry, Pharmacy, Nursing, Medicine), Arts &
                        Humanities and Social Sciences. With campuses at Coimbatore, Amritapuri,
                        Kochi, Chennai, Bangalore and Mysore, Amrita has emerged as one of the
                        fastest growing institutions of higher learning in the country. In the short span
                        of 14 years, we have established 150+ collaborations with top international
                        universities. The UGC has also granted graded autonomy to Amrita in 2018
                        for consistently maintaining high academic standards.We have been re-
                        accredited by NAAC with ‘A’ grade.</p>
                </div>
            </div>
        </div>
    </section>
);

export default AboutAmrita;