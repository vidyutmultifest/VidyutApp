import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import LoadingScreen from "../components/loadingScreen";

const cookies = new Cookies();

const LogoutPage = () => {
    const router = useRouter();

    const [loggedOut, logOut] = useState(false);

    useEffect(() => {
        cookies.remove('token');
        cookies.remove('refreshToken');
        cookies.remove('username');
        cookies.remove('transactionID');
        localStorage.clear();
        if(!loggedOut)
        {
            router.push('/explore');
            logOut(true);
        }
    });

    return !loggedOut ? <LoadingScreen text="Logging you out"/>
    : <LoadingScreen
            text="You have been logged-out. Please wait while we redirect you to the login page"
            showLinks
        />;
};

export default LogoutPage