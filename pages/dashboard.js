import {useRouter} from "next/router";
import React, {useEffect} from "react";
import ExplorePage from "./explore";

const Dashboard = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('/explore');
    });
    return <ExplorePage />;
};

export default Dashboard;

