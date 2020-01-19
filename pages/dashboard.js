import {useRouter} from "next/router";
import React, {useEffect} from "react";

const Dashboard = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('/explore');
    });
    return null;
};

export default Dashboard;

