import React from "react";
import Head from 'next/head'

import Base from "../../components/base";
import TitleBar from "../../components/titleBar";
import Footer from "../../modules/dashboard/footer";
import RestrictionsCard from "../../modules/purchase/restrictions";
import CartView from "../../modules/purchase/cart-view";


const PurchaseProShowTickets = () => {
    return (
        <Base loginRequired>
            <Head>
                <title>Purchase Pro-Show Tickets | Vidyut 2020</title>
            </Head>
            <TitleBar />
            <div className="container my-4">
                <CartView />
            </div>
            <RestrictionsCard />
            <Footer />
        </Base>
    )
};

export default PurchaseProShowTickets;