import React, { useEffect, useState, useRef } from "react";
import QRCode from "qrcode.react";
import Base from "../../components/base";
const hashes =  require('./hashes');


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

const TestGenerateTicket = () => {
    const [i, setI] = useState(0);
    const [autoInc, setAutoInc] = useState(false);

    useInterval(() => {
        if(autoInc)
        { setI(i + 1); }
    }, 4000);

    return <Base>
        <div style={{ height: '100vh', alignItems: 'center', display: "flex", justifyContent: "center"}}>
            <div>
                <h6>Ticket Tester</h6>
                <QRCode value={hashes[i]} size={256} />
                <div>
                    {
                        autoInc ?
                            <button
                                onClick={() => setAutoInc(false)}
                                className="btn btn-primary"
                            >
                                Disable Auto Increment
                            </button> :
                            <button
                                onClick={() => setAutoInc(true)}
                                className="btn btn-primary"
                            >
                                Auto Increment
                            </button>
                    }
                    {
                        !autoInc ?
                            <button
                                onClick={() => setI(i+1)}
                                className="btn btn-primary"
                            >
                                Next
                            </button> : null
                    }
                </div>
            </div>
        </div>
    </Base>
};

export default TestGenerateTicket