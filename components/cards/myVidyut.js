import React, {useEffect, useState} from "react";
import classNames from 'classnames';
import '../../styles/cards/myvidyut.sass';
import dataFetch from "../../utils/dataFetch";
import Link from "next/link";

const MyVidyut = () => {

    const [isQueried, setQueried] = useState(false);
    const [data, setData] = useState(false);

    const query = `{
      myVidyut
      {
        workshops { 
            name 
            contact
            schedule
            {
               venue
               start
               end
            }
        }
        tickets { name }
        competitions { 
            name 
            contact
            schedule
            {
               venue
               start
               end
            }
        }
      }
      myPermissions
      {
        adminAccess
      }
    }`;

    const getMyVidyut = async () => await dataFetch({ query });

    const [hasAdminAccess, setAdminAccesss] = useState(false);
    useEffect(() => {
        if(!isQueried)
        {
            getMyVidyut().then((response) =>{
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.myVidyut);
                    setAdminAccesss(response.data.myPermissions);
                }
            })
        }
    });

    const getSquares = (hours) => {
        const sql = [];
        for(let i=7; i<23; i++)
        {
            sql.push(<div className={classNames('hour-square', hours.includes(i) ? 'active-hour' : null)} />)
        }
        return sql
    };

    const renderEventDaysCard = (
        <div className="event-days">
            <div className="day">
                {getSquares([16,17,18,19,20,21,22])}
            </div>
            <div className="day">
                {getSquares([9,10,11,13,14,15,16,17,18])}
            </div>
            <div className="day">
                {getSquares([9,10,11,13,14,15,16,17])}
            </div>
        </div>
    );

    const renderEvent = (e) => (
        <div className="my-event-card">
            <h6>{e.name}</h6>
            {e.contact ?
                <div className="mt-2 small-text">{e.contact}</div>
                : null
            }
            {
                e.schedule ? e.schedule.map(s => (
                    <div className="mt-2 small-text">{s.start} - {s.end} { s.venue ? `at ${s.venue}` : null}</div>
                )) : null
            }

        </div>
    );

    return (
        <div className="my-vidyut-listing">
            <div className="my-event-type">
                {
                    hasAdminAccess ?
                        <div className="admin-access-prompt card-shadow py-4 mx-0">
                            <h3>You are an Admin Volunteer</h3>
                            <Link href="/admin"><button className="btn btn-light px-4 py-2">Go to Admin</button></Link>
                        </div> : null
                }

                <div className="type-title">
                    My Workshops
                </div>
                { data ? data.workshops.length > 0 ?  data.workshops.map(t => renderEvent(t)) :
                    <div className="empty-listing-card card-shadow my-2 p-3">
                        <img src={require('../../images/aoc/logos.jpg')} />
                        Oops! You have not enrolled for any workshops.  There are almost 25+ workrooms being
                        formulated at Vidyut 2020, collaborating with distinguished firms like FTII, WWF, Fujifilms,
                        FSSAI, IIT Bombay along with the accreditation from ACM, IEEE etc.
                        <a href="/workshops">
                            <button className="btn-primary mt-2 rounded-0 btn">Explore Workshops</button>
                        </a>
                    </div> : null }
            </div>
            <div className="my-event-type">
                <div className="type-title">
                    My Competitions
                </div>
                { data ? data.competitions.length > 0 ?  data.competitions.map(t => renderEvent(t)) :
                    <div className="empty-listing-card card-shadow my-2 p-3">
                        Alas! You have not logged in for any among the contests. Almost 40+ exhilarating championships
                        are going to be held at Vidyut 2020: fun-filled games, quizzes, tech design contests, CTF,
                        exhibitions and many more, with total prize money worth 15 Lakhs+.
                        <a href="/competitions">
                            <button className="btn-primary mt-2 rounded-0 btn">Explore Competitions</button>
                        </a>
                </div> : null }
            </div>
            <div className="my-event-type">
                <div className="type-title">
                    My Tickets
                </div>
                { data ? data.tickets.length > 0 ? data.tickets.map(t => renderEvent(t)) :
                    <div className="empty-listing-card card-shadow my-2 p-3">
                        Oh! You have not snapped up the tickets for Vidyut Pro- shows yet.This year, at Vidyut
                        we are on to you with three renowned artists :  The Agam Band, Mentalism ft. Arjun Guru,
                        Electronic music by Sunburn artists , and enriched with other stunning performances.
                        Don’t miss it ! grab your tickets now!
                        <a href="/shows">
                            <button className="btn-primary mt-2 rounded-0 btn">Purchase Tickets</button>
                        </a>
                    </div>: null }
            </div>
        </div>
    )
};

export default MyVidyut;