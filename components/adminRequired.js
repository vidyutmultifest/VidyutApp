import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import {useRouter} from "next/router";
import dataFetch from "../utils/dataFetch";
import LoadingScreen from "./loadingScreen";

const cookies = new Cookies();

const AdminRequired = ({ children }) => {
    const router = useRouter();
    const [hasQueried, setQueried] = useState(false);
    const [isAdmin, setAdmin] = useState(false);

    const isAdminQuery = `{
      myPermissions
      {
        adminAccess
      }
    }`;

    const checkIfAdmin = async () => await dataFetch({ query: isAdminQuery });

    useEffect(() => {
        if(!hasQueried)
        {
            const token = cookies.get('token');
            if (token == null) {
                router.push('/login');
            }
            else
                checkIfAdmin().then((response) => {
                    setQueried(true);
                    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                        setAdmin(response.data.myPermissions.adminAccess)
                    } else { setAdmin(false); }
                });
        }
    });

    return <div>
        { isAdmin ? children : hasQueried ?
            <h1>You don't have permission to view this page</h1> :
            <LoadingScreen text="We are checking your permissions"/>
        }
    </div>

};
export default AdminRequired;