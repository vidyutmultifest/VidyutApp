import dataFetch from "../../utils/dataFetch";
import React, {useEffect, useState} from "react";
import Base from "../../components/base";
import Head from "next/head";
import TitleBar from "../../components/titleBar";
import StatusContainer from "../../components/StatusContainer";
import Cookies from "universal-cookie";


const GatewayPage = () => {
    const cookies = new Cookies();
    const transactionID = cookies.get('transactionID');

    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);

    const getTrans = `query getTrans($transactionID: String){
      getPaymentGatewayData(transactionID: $transactionID)
      {
        url
        data
        code
      }
    }`;

    const getTransData = async variables => await dataFetch({ query: getTrans, variables });

    useEffect(() => {
        if (!isQueried) {
            getTransData({transactionID}).then(response => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.getPaymentGatewayData);
                    document ? document.forms["acrd-form"].submit() : null;
                    setLoaded(true);
                }
            })
        }
    });

    return <Base loginRequired>
        <Head>
            <title>Online Payments - Powered by ACRD Gateway | Vidyut 2020</title>
        </Head>
        <TitleBar/>
        <div className="d-flex align-items-center justify-content-center bg-gradient" style={{ minHeight: '90vh' }}>
            <div className="card-shadow text-center p-4">
                {
                        <React.Fragment>
                            <h4>Redirecting you to the Payment Gateway</h4>
                            <img src={require('../../images/logos/acrd-logo.jpg')}  className="my-4" style={{ width: '300px' }} />
                            <p className="small-text" style={{ maxWidth: "600px"}}>
                                Online Payments for Vidyut 2020 is handled by Amrita Centre for Research and Development.
                                On clicking proceed to pay button, you will be directed to their payment gateway that
                                supports debit/credit cards, and net-banking.
                            </p>
                            <div className="alert alert-warning">
                                <b>TransactionID:</b> VIDYUT{transactionID}
                            </div>
                            <form method="POST"  id="acrd-form" action={data ? data.url : null}>
                                <input type="hidden" value={data.data} name="encdata" id="encdata" />
                                <input type="hidden" value={data.code} name="code" id="code" />
                                {
                                    isLoaded ?
                                        <button className="btn btn-primary rounded-0 px-4 py-3 font-weight-bold" type="submit" id="pay">Click if Not Redirected</button>
                                        : null
                                }
                            </form>
                        </React.Fragment>
                }
            </div>
        </div>
    </Base>

};

export default GatewayPage;