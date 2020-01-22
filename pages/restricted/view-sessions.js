import React, {useEffect, useState} from "react";
import Topbar from "../../components/common/topbar";
import MenuBar from "../../components/common/menubar";
import Base from "../../components/base";
import dataFetch from "../../utils/dataFetch";

const ViewSessions = () => {
    const [isQueried, setQueried] = useState(false);
    const [data, setData] = useState(false);
    const query = `
    {
      listSessions
    }`;

    const getSessions = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried)
        {
            getSessions().then(response =>{
                setQueried(true);
                setData(response.data.listSessions);
            })
        }
    });

    return <Base loginRequired>
        <Topbar/>
        <MenuBar />
        <div className="container p-0">
            <div className="row my-4 mx-0">
                {
                    data && data.length > 0 ?
                        data.map(i =>
                            <div className="col-6 p-2">
                                <a href={`/restricted/verify-ticket?sessionID=${i}`} className="card-shadow p-2">
                                    {i}
                                </a>
                            </div>
                        ) : null
                }
            </div>
        </div>
    </Base>

};

export default ViewSessions;