import React from 'react'
import {useRouter} from "next/router";

const NotFoundPage = () => {
    const router = useRouter();
    console.log(router.route);
    return <h1>Not Found</h1>
};

export default NotFoundPage
