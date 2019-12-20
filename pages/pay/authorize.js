import React, {useEffect, useState} from "react";
import Base from "../../components/base";
import TitleBar from "../../components/titleBar";
import dataFetch from "../../utils/dataFetch";
import {useRouter} from "next/router";
import LoadingScreen from "../../components/loadingScreen";

const AuthorizePage = () => {
    const router = useRouter();
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);

    const query = `query getTrans($transactionID: String){
      getPaymentGatewayData(transactionID: $transactionID)
      {
        url
        data
        code
      }
}`;

    const getData = async variables => await dataFetch({ query, variables });

    useEffect(() => {
        const variables = {
            transactionID: router.query.transactionID
        };
        if(!isQueried)
        {
            getData(variables).then(  response => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.getPaymentGatewayData);
                    setLoaded(true);
                }
            })
        }
    });

    return isLoaded && data ? <Base loginRequired>
            <TitleBar/>
            <div className="d-flex align-items-center justify-content-center bg-gradient" style={{ minHeight: '90vh' }}>
                <div className="card-shadow text-center p-4">
                    <h4>Proceed to Payment Gateway</h4>
                    <img src={require('../../images/logos/acrd-logo.jpg')}  className="my-4" style={{ width: '300px' }}/>
                    <p style={{ maxWidth: "600px"}}>
                        Online Payments for Vidyut 2020 is handled by Amrita Centre for Research and Development.
                        On clicking proceed to pay button, you will be directed to their payment gateway that
                        supports debit/credit cards, and net-banking.
                    </p>
                    <form method="POST" action={data.url}>
                        <input type="hidden" value={data.data} name="encdata" id="encdata" />
                        <input type="hidden" value={data.code} name="code" id="code" />
                        <button className="btn btn-primary rounded-0 px-4 py-3 font-weight-bold" type="submit" id="pay">Proceed to Pay</button>
                    </form>
                </div>
            </div>
        </Base> : <LoadingScreen text="Loading Payment Gateway" />
};

export default AuthorizePage;