import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import {useRouter} from "next/router";

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
        { hasVerified ? children : <h1>Checking if you are logged-in</h1>}
    </div>

};
export default ProtectedPage;