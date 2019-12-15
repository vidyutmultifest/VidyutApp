import React, {useEffect} from "react";
import LoadingScreen from "../../components/loadingScreen";
import {useRouter} from "next/router";
import Head from "next/head";


export default () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/competition/choreonite');
    });

    return <React.Fragment>
        <Head>
            <title>Choreonite | Vidyut 2020 - National-Level Multifest | Amrita Vishwa Vidyapeetham, Amritapuri Campus</title>
        </Head>
        <LoadingScreen title="Redirecting You" label="Taking you to the choreonite page." />
    </React.Fragment>

};