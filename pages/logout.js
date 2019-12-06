import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import LoadingScreen from "../components/loadingScreen";

const cookies = new Cookies();

const LogoutPage = () => {
    const router = useRouter();

    const [loggedOut, logOut] = useState(false);

    useEffect(() => {
        if(!loggedOut)
        {
            cookies.remove('token');
            cookies.remove('refreshToken');
            cookies.remove('username');
            localStorage.clear();
            router.push('/login');
            logOut(true);
        }
    });

    return !loggedOut ? <LoadingScreen text="Logging you out"/> : <LoadingScreen text="You have been logged-out. Please wait while we redirect you to the login page"/>;
};

export default LogoutPage