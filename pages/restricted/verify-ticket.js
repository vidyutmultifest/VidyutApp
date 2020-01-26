import React, {useEffect, useRef, useState} from "react";
import Base from "../../components/base";
import NoSSR from "../../components/noSSR";
import dataFetch from "../../utils/dataFetch";
import dynamic from "next/dynamic";

import '../../styles/bootstrap.sass';
import {useRouter} from "next/router";


function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const VerifyTicket = () => {
    const router = useRouter();
    const [hash, setHash] = useState();
    const [isQueried, setQueried] = useState(false);
    const [data, setData] = useState(false);
    const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false});

    const [paused, setPause] = useState(false);

    const query = `query validateTicket($hash: String!, $sessionID: String!){
      validateTicket(hash: $hash, sessionID: $sessionID)
      {
        status
        userName
        productName
        rollNo
        photo
      }
    }`;

    const mutation = `mutation checkInUser($hash: String!, $sessionID: String!){
      performCheckIn(hash: $hash, sessionID: $sessionID)
    }`;

    const validateTicket = async variables => await dataFetch({ query, variables });
    const checkInUser = async variables => await dataFetch({ query: mutation, variables });

    useEffect(() => {
        if(!isQueried && hash)
        {
            const sessionID = router.query.sessionID;
            validateTicket({
                hash, sessionID: sessionID
            }).then(response => {
                setData(response.data.validateTicket);
                setQueried(true);
            })
        }
    });

    const handleCheckIn = () => {
        if(hash)
        {
            const sessionID = router.query.sessionID;
            checkInUser({
                hash,
                sessionID
            }).then(response => {
                setHash(false);
            })
        }
    };

    const handleScan = data => {
        if(data != null && data !== hash)
        {
            setHash(data);
            setData(false);
            setQueried(false);
        }
    };

    useInterval(() => {
        if(!paused)
        {
            handleCheckIn();
            setData(false);
        }
    }, 3000);

    const handleOnAccept = () => {
        handleCheckIn();
        setData(false);
    };

    const handleOnReject = () => {
        setData(false);
    };

    return (
        <Base loginRequired>
            <div className="d-flex justify-content-center align-items-center bg-dark w-100" style={{ minHeight: '100vh'}}>
                {
                    isQueried && data ?
                        <div className="card-shadow p-2">
                            <div className="font-weight-bold">{data.productName}</div>
                            <h3 className="mb-0">{data.userName}</h3>
                            <div>{data.rollNo ? data.rollNo : 'Roll No. Unavailable'}</div>
                            {
                                data.photo ?
                                <div
                                    style={{
                                        backgroundImage: `url(${data.photo})`,
                                        width: '50vh',
                                        height: '50vh',
                                        backgroundSize: 'cover',
                                        backgroundRepeat:'no-repeat'
                                    }}
                                /> : null
                            }
                            <div className="p-4 text-center">
                                {
                                    !paused ?
                                        <div
                                            onClick={() => setPause(true)}
                                            className="btn btn-danger rounded-0 m-2 p-2"
                                        >
                                            Stop Auto Pass
                                        </div>
                                    : <div
                                        onClick={() => setPause(false)}
                                        className="btn btn-success rounded-0 m-2 p-2"
                                    >
                                            Resume Auto Pass
                                    </div>
                                }
                                {
                                    paused ?
                                        <div>
                                            <div
                                                onClick={handleOnAccept}
                                                className="btn btn-success rounded-0 m-2"
                                            >
                                                Approve
                                            </div>
                                            <div
                                                onClick={handleOnReject}
                                                className="btn btn-danger rounded-0 m-2"
                                            >
                                                Reject
                                            </div>
                                        </div> : null
                                }
                            </div>
                        </div>
                    : <div className="p-2">
                        <NoSSR>
                            <QrReader
                                delay={20}
                                onScan={handleScan}
                                onError={(e) => console.log(e)}
                                facingMode="environment"
                                style={{width: '90vw', maxWidth: "400px"}}
                            />
                        </NoSSR>
                    </div>
                }
            </div>
        </Base>
    )
};

export default VerifyTicket