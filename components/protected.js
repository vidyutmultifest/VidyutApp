import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import {useRouter} from "next/router";
import LoadingScreen from "./loadingScreen";

const cookies = new Cookies();

const ProtectedPage = ({ children }) => {
    const router = useRouter();
    const [hasVerified, setVerified] = useState(false);

    useEffect(() => {
        if(!hasVerified)
        {
            const token = cookies.get('token');
            if (token == null) {
                router.push('/login');
            }
            else
                setVerified(true);
        }
    });

    return <div>
        { hasVerified ? children : <LoadingScreen text="Checking if you have permissions"/>}
    </div>

};
export default ProtectedPage;