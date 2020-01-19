import React, {useEffect, useState} from "react";
import dataFetch from "../../utils/dataFetch";
import Link from "next/link";

const ListTeams = () => {
    const [isQueried, setQueried] = useState(false);
    const [myTeams, setMyTeams] = useState(false);

    const myTeamsQuery = `{
      myTeams
      {
        name
        membersCount
        isUserLeader
        hash
      }
    }`;

    const getMyTeams = async () => await dataFetch({ query: myTeamsQuery });

    useEffect(() => {
        if(!isQueried)
        {
            getMyTeams().then((response) => {
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setQueried(true);
                    setMyTeams(response.data.myTeams);
                }
            });
        }
    });

    return myTeams && myTeams.length > 0 ?
        <div className="p-2">
            <h4>My Teams</h4>
            { myTeams.map(t => (
                <Link href={`/teams/view?hash=${t.hash}`}>
                    <div className="btn w-100 card-shadow d-block text-left my-2 p-3">
                        <h6>{t.name}</h6>
                        { t.isUserLeader ? <span className="badge badge-warning px-3 py-2 mr-2">Leader</span> : null}
                        <span className="badge badge-primary px-3 py-2">{t.membersCount} Member{t.membersCount > 1 ? 's' : null}</span>
                    </div>
                </Link>
            ))}
        </div> : null

};

export default ListTeams;