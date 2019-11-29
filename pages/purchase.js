import React, {useEffect, useState} from "react";
import Head from 'next/head'
import {useRouter} from "next/router";

import TitleBar from "../components/titleBar";
import Footer from "../modules/dashboard/footer";
import Base from "../components/base";
import CartView from "../modules/purchase/cart-view";
import dataFetch from "../utils/dataFetch";


const PurchasePage = () => {
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
        }
      }
    }`;

    const getProduct = async (variables) => await dataFetch({ query, variables });

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

    return (
        <Base loginRequired>
            <Head>
                <title>Purchase Tickets, Register for Events | Checkout Page | Vidyut 2020</title>
            </Head>
            <TitleBar/>
            <div className="container my-4">
                {
                    isLoaded ? <CartView
                        products={[
                            {
                                name: data.product.name,
                                productID: router.query.product,
                                price: data.product.price,
                                photo: data.product.photo,
                                id: router.query.product,
                                qty: 1
                            }
                        ]}
                        vidyutID="sss"
                    /> : null
                }
            </div>
            <Footer/>
        </Base>
    )
};

export default PurchasePage