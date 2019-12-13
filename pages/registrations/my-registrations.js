import React, {useEffect, useState} from "react";
import Head from "next/head";

import dataFetch from "../../utils/dataFetch";
import Base from "../../components/base";
import TitleBar from "../../components/titleBar";
import DashboardFooter from "../../modules/dashboard/footer";
import StatusContainer from "../../components/StatusContainer";

const MyRegistrations = () => {
    const [isQueried, setQueried] = useState(false);
    const [data, setData] = useState(false);

    const query = `{
      myRegistrations
      {
        registrationTimestamp
        regID
      }
    }`;

    const getRegs = async () => await dataFetch({query});


    useEffect(() => {
        if(!isQueried)
        {
            getRegs().then((response) => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.myRegistrations);
                }
            })
        }
    });

    return <Base loginRequired>
        <Head>
            <title>My Registrations | Registrations | Vidyut 2020</title>
        </Head>
        <TitleBar />
        {
            data && data.length > 0 ?
                <div className="container p-0">
                    <h1 className="my-4">My Registrations</h1>
                    <div className="card-shadow p-4">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <td style={{ width: "10px"}} className="col">#</td>
                                    <td className="col">Event</td>
                                    <td className="col">ID</td>
                                    <td className="col">Timestamp</td>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                data.map((r,i) => (
                                    <tr>
                                        <td style={{ width: "10px"}} scope="row">{i+1}</td>
                                        <td>Event</td>
                                        <td>{r.regID}</td>
                                        <td>{r.registrationTimestamp}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div> : <StatusContainer
                    title="No Registrations Found"
                    image={require('../../images/illus/sad.png')}
                    text="Looks like you have not registered for any events for Vidyut 2020"
                />
        }
        <DashboardFooter />
    </Base>
};

export  default MyRegistrations;