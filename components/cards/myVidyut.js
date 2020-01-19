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
        workshops { name }
        tickets { name }
        competitions { name }
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
                    <div className="empty-listing-card card-shadow my-2 p-2">
                        You have not registered for any workshops. There are 25+ workshops being
                        organized at Vidyut 2020 partnering with distinguished organizations like FTII, WWF,
                        Fujifilm, FSSAI etc., and are accredited by ACM, IEEE etc.
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
                    <div className="empty-listing-card card-shadow my-2 p-2">
                        You have not registered for any competitions. There are 40+ exciting competitions
                        being held at Vidyut 2020, from fun-games, quizzes, to technical design contests,
                        CTFs and Exhibitions, we have it all!
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
                    <div className="empty-listing-card card-shadow my-2 p-2">
                        You have not purchased ticket for Vidyut Proshows. This year at Vidyut,
                        we are featuring 3 renowned artists - Nucleya, The Agam Band
                        and Mentalism ft. Arjun Guru, alongside other stunning performances. Don't
                        miss it, book your tickets now!
                        <a href="/shows">
                            <button className="btn-primary mt-2 rounded-0 btn">Purchase Tickets</button>
                        </a>
                    </div>: null }
            </div>
        </div>
    )
};

export default MyVidyut;