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
      {
         name
         products
         sessionID
         checkInCount
         issuerCount
      }
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
            <div className="my-4">
                {
                    data && data.length > 0 ?
                        data.map(i =>
                            <div className="my-2 p-2">
                                <a href={`/restricted/verify-ticket?sessionID=${i.sessionID}`} className="plain-link">
                                    <div className="card-shadow d-block p-2">
                                        <div className="row m-0">
                                            <div className="col-md-8 p-2">
                                                <h5>{i.name}</h5>
                                                <div className="small-text">{ i.products.map(p => <span>{p}, </span>) }</div>
                                            </div>
                                            <di className="col-md-4 p-2">
                                                <div className="row m-0 text-center">
                                                    <div className="col-6 col-md-12">
                                                        <div className="h3 m-0">{i.checkInCount}</div>
                                                        <span className="font-weight-bold">Checked-In</span>
                                                    </div>
                                                    <div className="col-6 col-md-12">
                                                        <div className="h3 m-0">{i.issuerCount}</div>
                                                        <span className="font-weight-bold">Issuer Count</span>
                                                    </div>
                                                </div>
                                            </di>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ) : null
                }
            </div>
        </div>
    </Base>

};

export default ViewSessions;