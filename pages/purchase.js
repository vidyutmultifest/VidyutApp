import React, {useEffect, useState} from "react";
import Head from 'next/head'
import {useRouter} from "next/router";

import Base from "../components/base";
import CartView from "../modules/purchase/cart-view";
import dataFetch from "../utils/dataFetch";
import '../styles/bootstrap.sass';
import StatusContainer from "../components/StatusContainer";
import Topbar from "../components/common/topbar";
import MenuBar from "../components/common/menubar";
import BottomBar from "../components/common/bottombar";


const PurchasePage = () => {
    const router = useRouter();
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoading] = useState(false);
    const [data, setData] = useState();
    const [profileData, setProfileData] = useState();

    const query = `query getProduct($productID: String!){
      myProfile
      {
        isAmritian
        isAmritapurian
        isFaculty
        isSchoolStudent
        hasEventsRegistered
      }
      getProduct(productID: $productID)
      {
        name
        price
        isAvailable
        isAmritapurianOnly
        isFacultyOnly
        isSchoolOnly
        isOutsideOnly
        requireEventRegistration
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
                        setProfileData(response.data.myProfile);
                        setLoading(true);
                    }
                })
            }
        }
    });


    const checkPossible = () => {
        return !!(
            data.isAvailable &&
            (!data.requireEventRegistration || profileData.isAmritapurian || profileData.hasEventsRegistered) &&
            (!data.isAmritapurianOnly || profileData.isAmritapurian) &&
            (!data.isOutsideOnly || !profileData.isAmritapurian) &&
            (!data.isFacultyOnly || profileData.isFaculty) &&
            (!data.isSchoolOnly || profileData.isSchoolStudent)
        );
    };

    return (
        <Base loginRequired>
            <Head>
                <title>Purchase Tickets, Register for Events | Checkout Page | Vidyut 2020 | National Level Multifest - Amrita Vishwa Vidyapeetham, Amritapuri Campus</title>
            </Head>
            <Topbar />
            <MenuBar/>
            {
               isLoaded ?
                   checkPossible() ?
                   <div className="container p-0 my-md-4 my-0">
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
                                       qty: router.query.qty ? router.query.qty : 1,
                                       isAvailable: data.isAvailable
                                   }
                               ]}
                               promocode={router.query.promocode}
                               regID={router.query.regID}
                           /> : null
                       }
                   </div>
                   : <div className="p-4">
                           <StatusContainer
                               animation={require('../images/animations/cross-failed')}
                               title="You are not allowed to purchase this item"
                           />
                   </div>

               : null
            }
            <BottomBar
                currentTabName="Purchase"
            />
        </Base>
    )
};

export default PurchasePage