import React, {useEffect, useRef, useState} from "react";
import Base from "../../components/base";
import NoSSR from "../../components/noSSR";
import dataFetch from "../../utils/dataFetch";
import dynamic from "next/dynamic";
import MenuBar from "../../components/common/menubar";
import DashboardFooter from "../../components/common/footer";
import Topbar from "../../components/common/topbar";

import '../../styles/bootstrap.sass';
import BottomBar from "../../components/common/bottombar";

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
    const [hash, setHash] = useState();
    const [isQueried, setQueried] = useState(false);
    const [data, setData] = useState(false);
    const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false});

    const [paused, setPause] = useState(false);

    const query = `query validateTicket($hash: String!, $productID: String!){
      validateTicket(hash: $hash, productID: $productID)
      {
        status
        userName
        productName
        rollNo
        photo
      }
    }`;

    const validateTicket = async variables => await dataFetch({ query, variables });

    useEffect(() => {
        if(!isQueried && hash)
        {
            validateTicket({ hash, productID: "158d6d73-3377-4d9f-b7d1-21ce58a7eec8"}).then(response => {
                setData(response.data.validateTicket);
                setQueried(true);
            })
        }
    });


    const handleScan = data => {
        if(data != null && data !== hash)
        {
            setHash(data);
            setData(false);
            setQueried(false);
        }
    };

    useInterval(() => {
        if(hash && !paused)
        {
            setData(false);
        }
    }, 3000);

    return (
        <Base loginRequired>
            <div className="d-flex justify-content-center align-items-center bg-dark w-100" style={{ minHeight: '80vh'}}>
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
                                        height: '50vh'
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
                                            <div className="btn btn-success rounded-0 m-2">
                                                Approve
                                            </div>
                                            <div className="btn btn-danger rounded-0 m-2">
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
                                style={{width: '90vw'}}
                            />
                        </NoSSR>
                    </div>
                }
            </div>
        </Base>
    )
};

export default VerifyTicket