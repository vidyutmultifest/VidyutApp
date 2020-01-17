import TitleBar from "../components/titleBar";
import Base from "../components/base";
import React, {useEffect, useState} from "react";
import dataFetch from "../utils/dataFetch";
import Head from "next/head";
const shortid = require('shortid');


const CrewPage = () => {

    const query = `{
      listCrew
      {
        name
        role
        isCore
        isHead
        isFaculty
        team
        {
          name
          color
        }
        photo
      }
    }`;

    const getCrew = async () => await dataFetch({ query });

    const [isQueried, setQueried] = useState(false);
    const [data, setData] = useState(false);
    useEffect(() => {
        if(!isQueried)
        {
            getCrew().then(  response => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.listCrew);
                }
            })
        }
    });

    return (
        <Base>
            <Head>
                <title>Crew - Vidyut Team 2020 | National Level Multifest</title>
            </Head>
            <TitleBar />
            <section
                style={{
                    backgroundImage: `url(${require('../images/aoc/crew.jpg')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div
                    style={{ backgroundColor: 'rgba(0,0,0,0.6)', minHeight: '60vh', width: '100%'}}
                    className="d-flex align-items-center justify-content-center text-light"
                >
                    <div className="container text-center" style={{ marginTop: '15vh'}}>
                        <h1>Team Vidyut</h1>
                        <p className="d-none d-md-block">
                            Any successful endeavour is incomplete without its powerful crew.
                            Vidyut is truly blessed to encompass a group of vibrant students who ensures perfection in each and
                            every step of the event. Vidyut 2019 was undoubtedly an immense success due to the strenuous efforts
                            and contribution from its supportive crew members. Their wholehearted cooperation and timely actions
                            elevated the quality of everything. Vidyut 2020 is the next platform where the crew members would
                            continue to exhibit the celebrated legacy of success through their joined efforts and hard work,
                            manifesting themselves as pillars of strength in executing the ideas appropriately.
                        </p>
                    </div>
                </div>
            </section>
            <div className="p-md-4">
                {
                    data ?
                        data.length > 0 ?
                            <div className="row m-0">
                                {
                                    data.map(m =>
                                        <div key={shortid.generate()} className="col-md-4 col-lg-3 p-2">
                                            <div className="card-shadow">
                                                <div
                                                    style={{
                                                        backgroundImage: `url(${m.photo ? m.photo : require('../images/assets/vidyut_placeholder.jpg')})`,
                                                        backgroundSize: `cover`,
                                                        height: '300px',
                                                        width: '100%',
                                                        position: 'relative'
                                                    }}
                                                >{ m.isFaculty ?
                                                    <div className="py-2"><div
                                                        className="d-inline card-shadow mb-3 p-2 font-weight-bold small-text"
                                                        style={{
                                                            backgroundColor: '#64FFDA',
                                                            position: 'absolute',
                                                            top: '0.5rem',
                                                            left: '0.5rem'
                                                        }}
                                                    >
                                                        <img src={require('../images/icons/heart.png')} style={{ width: '20px'}}  className="mr-2" />
                                                        Faculty
                                                    </div></div>
                                                    : m.isCore ?
                                                    <div className="py-2"><div
                                                        className="d-inline card-shadow mb-3 p-2 font-weight-bold small-text"
                                                        style={{
                                                            backgroundColor: '#FFF176',
                                                            position: 'absolute',
                                                            top: '0.5rem',
                                                            left: '0.5rem'
                                                        }}
                                                    >
                                                        <img src={require('../images/icons/diamond.png')} style={{ width: '20px'}}  className="mr-2" />
                                                        Core Member
                                                    </div></div>
                                                    : m.isHead ?
                                                        <div className="py-2"><div
                                                            className="d-inline card-shadow mb-3 p-2  font-weight-bold small-text"
                                                            style={{
                                                                backgroundColor: '#FFFFFF',
                                                                position: 'absolute',
                                                                top: '0.5rem',
                                                                left: '0.5rem'
                                                            }}
                                                        >
                                                            <img src={require('../images/icons/star.png')} style={{ width: '20px'}}  className="mr-2" />
                                                            Team Head
                                                        </div></div> : null
                                                }</div>
                                                <div
                                                    style={{
                                                        backgroundColor: `${m.team.color}`,
                                                        color: 'white'
                                                    }}
                                                    className="px-4 py-2 mx-0 font-weight-bold"
                                                >
                                                    {m.team.name}
                                                </div>
                                                <div className="p-4">
                                                    <h5 className="mb-2">{m.name}</h5>
                                                    <div className="small-text">{m.role}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div> : null
                        : null
                }
            </div>
        </Base>
    )
};

export default CrewPage;