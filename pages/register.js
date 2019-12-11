import React, {useEffect, useState} from "react";

import {useRouter} from "next/router";
import dataFetch from "../utils/dataFetch";
import Base from "../components/base";
import Head from "next/head";
import TitleBar from "../components/titleBar";
import Footer from "../modules/dashboard/footer";
import AgreementCard from "../components/dashboard/AgreementCard";
import LoadingScreen from "../components/loadingScreen";

const RegisterPage = () => {
    const router = useRouter();
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoading] = useState(false);
    const [data, setData] = useState();


    const query = `query getProduct($productID: String!){
      getProduct(productID: $productID)
      {
        isAvailable
        product
        {
          name
          price
          slug
          type
          photo
          details
        }
      }
    }`;

    const getProduct = async (variables) => await dataFetch({query, variables});

    useEffect(() => {
        if(!isQueried)
        {
            const productID = router.query.product;
            if(productID !== undefined)
            {
                getProduct({ productID }).then(  response => {
                    setQueried(true);
                    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                        setData(response.data.getProduct);
                        setLoading(true);
                    }
                })
            }
        }
    });

    return isLoaded ? (
        <Base loginRequired>
            <Head>
                <title>Purchase Tickets, Register for Events | Checkout Page | Vidyut 2020</title>
            </Head>
            <TitleBar/>
            <div className="container my-4">
                <AgreementCard
                    content={isLoaded ? data.product.details : null}
                    onCheck={(e) => console.log(e)}
                    agreementText="By proceeding further with my registration, I agree to the above terms of the event and the general code of conduct of Vidyut 2020."
                />
            </div>
            <Footer/>
        </Base>
    ) : <LoadingScreen text="Opening registration page" />;
};

export default RegisterPage;