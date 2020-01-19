import {useRouter} from "next/router";
import React, {useEffect} from "react";
import Head from "next/head";
import LoadingScreen from "../components/loadingScreen";
import ProtectedPage from "../components/protected";

export default () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/explore');
    });

    return <ProtectedPage>
        <Head>
            <title>Dashboard | Vidyut 2020 - National-Level Multifest | Amrita Vishwa Vidyapeetham, Amritapuri
                Campus</title>
        </Head>
        <LoadingScreen title="Redirecting You" label="Taking you to the choreonite page."/>
    </ProtectedPage>
}
