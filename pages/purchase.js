import React, {useEffect, useState} from "react";
import Head from 'next/head'
import {useRouter} from "next/router";

import TitleBar from "../components/titleBar";
import Footer from "../modules/dashboard/footer";
import Base from "../components/base";
import CartView from "../modules/purchase/cart-view";
import dataFetch from "../utils/dataFetch";
import '../styles/bootstrap.sass';


const PurchasePage = () => {
    const router = useRouter();
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoading] = useState(false);
    const [data, setData] = useState();


    const query = `query getProduct($productID: String!){
      getProduct(productID: $productID)
      {
        name
        price
        isAvailable
        isAmritapurianOnly
        isFacultyOnly
        isSchoolOnly
        product
        {
          name
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
                        productList={[
                            {
                                name: data.name,
                                productID: router.query.product,
                                price: data.price,
                                photo: data.product.photo,
                                isAmritapurianOnly: data.isAmritapurianOnly,
                                isFacultyOnly: data.isFacultyOnly,
                                isSchoolOnly: data.isSchoolOnly,
                                id: router.query.product,
                                qty: router.query.qty ? router.query.qty : 1

                        }
                        ]}
                        promocode={router.query.promocode}
                    /> : null
                }
            </div>
            <Footer/>
        </Base>
    )
};

export default PurchasePage