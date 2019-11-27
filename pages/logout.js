import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';

const cookies = new Cookies();

const LogoutPage = () => {
    const router = useRouter();

    const [loggedOut, logOut] = useState(false);

    useEffect(() => {
        if(!loggedOut)
        {
            const token = cookies.get('token');
            if(token == null)
                router.back();
            else
            {
                cookies.remove('token');
                cookies.remove('refreshToken');
                cookies.remove('username');
                localStorage.clear();
                router.push('/login');
            }
            logOut(true);
        }
    });

    return !loggedOut ? <h1>Logging You Out</h1> : null;
};

export default LogoutPage