import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import dataFetch from "../utils/dataFetch";
import moment from "moment";

const cookies = new Cookies();

const ProtectedComponent = ({ children }) => {
    const [hasVerified, setVerified] = useState(false);

    const Mutation = `mutation verifyToken($token: String!){
      verifyToken(token:$token)
      {
        payload
      }
    }`;

    const verifyToken = async variables => await dataFetch({ query: Mutation, variables });
    const [show, setShow] = useState(false);
    useEffect(() => {
        if(!hasVerified)
        {
            const token = cookies.get('token');
            if (token == null) {
                setShow(false);
            }
            else
            {
                verifyToken({ token }).then(  response => {
                    setVerified(true);
                    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                        if(moment().unix() > response.data.verifyToken.payload.exp){
                            setShow(false);
                        }
                        setShow(true);
                    }
                    else {
                        setShow(false);
                    }
                })
            }
        }
    });

    return <React.Fragment>
        { hasVerified && show ? children : null}
    </React.Fragment>

};
export default ProtectedComponent;