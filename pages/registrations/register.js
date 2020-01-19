import React, {useEffect, useState} from "react";
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import posed, { PoseGroup } from 'react-pose';

import dataFetch from "../../utils/dataFetch";
import Base from "../../components/base";
import TitleBar from "../../components/titleBar";
import Footer from "../../modules/dashboard/footer";
import LoadingScreen from "../../components/loadingScreen";

import TeamSelector from "../../modules/registrations/teamSelector";
import EventRegistrationForm from "../../modules/registrations/eventRegistrationForm";
import UserAgreement from "../../modules/registrations/userAgreement";
import SubmissionPreview from "../../modules/registrations/submissionPreview";
import StatusContainer from "../../components/StatusContainer";
import DashboardFooter from "../../modules/dashboard/footer";
import Topbar from "../../components/common/topbar";
import MenuBar from "../../components/common/menubar";
import BottomBar from "../../components/common/bottombar";

const RegisterPage = () => {
    const router = useRouter();
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoading] = useState(false);
    const [data, setData] = useState();
    const [isAlreadyRegistered, setAlreadyRegistered] = useState(false);
    const [isError, setError] = useState(false);

    const [isTeamSelected, setTeamSelected] = useState(false);
    const [isFormFilled, setFormFilled] = useState(false);
    const [hasAgreed, setAgreed] = useState(false);
    const [hasRegistered, setRegistered] = useState(false);

    const [teamSelected, setTeam] = useState(false);
    const [formData, setFormData] = useState(false);

    const [regID, setRegID] = useState(false);

    const query = `query getProduct($productID: String!){
      isAlreadyRegistered(productID: $productID)
      getProduct(productID: $productID)
      {
        isAvailable
        requireAdvancePayment
        showAgreementPage
        product
        {
          name
          price
          slug
          type
          photo
          details
          {
              details
              isTeamEvent
              minTeamSize
              maxTeamSize
              isTotalRate
              formFields
              {
                 key
                 label
                 type
                 required
                 options
                 {
                   key
                   label
                 }
              }
          }
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
                        setAlreadyRegistered(response.data.isAlreadyRegistered);
                        setLoading(true);
                    } else {
                        setError(true);
                    }
                })
            }
        }
    });

    const handleTeamSelection = (team) => {
        setTeam(team);
        setTeamSelected(true);
    };

    const handleFormSubmission = (data) => {
        setFormData(data);
        setFormFilled(true);
    };

    const TeamRegMutation = `mutation register($formData: String, $productID: String!, $teamHash: String)
    {
      register(formData: $formData,productID: $productID, teamHash: $teamHash)
      {
        regID
      }
    }`;

    const IndRegMutation = `mutation register($formData: String, $productID: String!)
    {
      register(formData: $formData,productID: $productID)
      {
        regID
      }
    }`;

    const submitReg = async (mutation, variables) => await dataFetch({query: mutation, variables});

    const handleSubmit = () => {
        let variables;
        if(data.product.details.isTeamEvent)
        {
            variables = {
                "formData": formData,
                "productID": router.query.product,
                "teamHash": teamSelected.hash
            };
            submitReg(TeamRegMutation, variables).then((response) => {
                setRegID(response.data.register.regID);
                if(data.requireAdvancePayment)
                {
                    router.push(`/purchase?product=${router.query.product}&qty=${teamSelected && !data.product.details.isTotalRate ? teamSelected.membersCount : 1}&regID=${regID}`)
                }
                setRegistered(true);
            })
        } else {
            variables = {
                "formData": formData,
                "productID": router.query.product,
            };
            submitReg(IndRegMutation, variables).then((response) => {
                setRegID(response.data.register.regID);
                if(data.requireAdvancePayment)
                {
                    router.push(`/purchase?product=${router.query.product}&qty=${teamSelected && !data.product.details.isTotalRate ? teamSelected.membersCount : 1}&regID=${response.data.register.regID}`)
                }
                setRegistered(true);
            })
        }


    };

    const Shade = posed.div({
        enter: { y: 20, opacity: 1, delay: 300, delayChildren: 500, ease: 'anticipate' },
        exit: { y: -20, opacity: 0 },
    });

    return   (
    <Base loginRequired>
        <Head>
            <title>Register for {isLoaded ? data.product.name : "Register for Vidyut"} | Registration Page | Vidyut 2020</title>
        </Head>
        {isAlreadyRegistered ?
             <React.Fragment>
                 <Topbar/>
                 <MenuBar/>
                 <div className="container p-0 my-4">
                     <div className="card-shadow p-4">
                         <StatusContainer
                             animation={require('../../images/animations/done-button')}
                             title="Already Registered."
                             text="It seems that you have already registered for this event.
                                    If your transaction wasn't successful,
                                    please go to the link below and retry payment.
                                    Thank You!"
                             buttons={
                                 <Link href="/registrations/my-registrations">
                                 <button className="btn btn-primary rounded-0 px-4 my-4 py-2">View My Registrations</button>
                             </Link>}
                         />
                     </div>
                 </div>
                 <DashboardFooter />
             </React.Fragment>
            : isError ?
            <LoadingScreen
                text="We couldn't load this page due to a error. Try again later, or if this error exists, contact web@vidyut.amrita.edu."
                showLinks
            />
            : isLoaded ? (
                <React.Fragment>
                    <Topbar />
                    <MenuBar/>
                        <div className = "container p-0 my-4">
                        <h2 className="mt-4 mx-md-0 mx-4">{data.product.name} Registration</h2>
                    <PoseGroup>
                    {
                        !isTeamSelected ? <Shade key="teamselection">
                            {
                                data.product.details.isTeamEvent ?
                                    <TeamSelector
                                        onSelect={handleTeamSelection}
                                        maxTeamSize={data.product.details.maxTeamSize}
                                        minTeamSize={data.product.details.minTeamSize}
                                        teamSelected={teamSelected}
                                    /> : setTeamSelected(true)
                            }
                        </Shade> : !isFormFilled ? <Shade key="form">
                            {
                                data.product.details.formFields !== null ?
                                    <EventRegistrationForm
                                        fields={data.product.details.formFields}
                                        onSubmit={(data) => handleFormSubmission(data)}
                                        onClickBack={() => setTeamSelected(false)}
                                        formData={formData}
                                        showBackButton={data.product.details.isTeamEvent}
                                    /> : setFormFilled(true)
                            }
                        </Shade> : data.showAgreementPage && !hasAgreed ?
                            <Shade key="agreement">
                                <UserAgreement
                                    content={data.product.details.details}
                                    onAgree={() => setAgreed(true)}
                                    onClickBack={() => setFormFilled(false)}
                                />
                            </Shade> : !(!formData && !teamSelected) && !hasRegistered ?
                                <Shade key="preview">
                                    <SubmissionPreview
                                        formData={formData}
                                        team={teamSelected}
                                        onSubmit={handleSubmit}
                                        onClickBack={() => data.showAgreementPage ? setAgreed(false) : setFormFilled(false)}
                                    />
                                </Shade> : regID ? <Shade key="preview">
                                    <div className="card-shadow p-4">
                                        {
                                            !data.requireAdvancePayment ?
                                                <StatusContainer
                                                    animation={require('../../images/animations/done-button')}
                                                    title="Registered Successfully"
                                                    text={`Thank you for registering, and we look forward to meet you at Vidyut 2020. Your registration ID is ${regID}`}
                                                    buttons={<div>
                                                        {
                                                            parseInt(data.product.price) > 0 ?
                                                                <Link href={
                                                                    `/purchase?product=${router.query.product}&qty=${teamSelected && !data.product.details.isTotalRate ? teamSelected.membersCount : 1}&regID=${regID}`
                                                                }>
                                                                    <button className="btn btn-primary font-weight-bold m-2">Pay for Registration</button>
                                                                </Link> : null
                                                        }
                                                        <Link href="/registrations/my-registrations">
                                                            <button className="btn btn-primary font-weight-bold m-2">View My
                                                                Registrations
                                                            </button>
                                                        </Link>
                                                    </div>}
                                                /> : <StatusContainer
                                                    animation={require('../../images/animations/collect-money')}
                                                    title="Registered, Awaiting Payment"
                                                    text={`Please click on the button below to pay for your registration. Your registration ID is ${regID}`}
                                                    buttons={<div>
                                                        <Link href={
                                                            `/purchase?product=${router.query.product}&qty=${teamSelected && !data.product.details.isTotalRate ? teamSelected.membersCount : 1}&regID=${regID}`
                                                        }>
                                                            <button className="btn btn-primary font-weight-bold m-2">Proceed to Pay</button>
                                                        </Link>
                                                    </div>}
                                                />
                                        }
                                    </div>
                                </Shade> : handleSubmit()
                    }
                    </PoseGroup>
                    </div>
                    <BottomBar
                        showDashboardIcon
                    />
                </React.Fragment>
            ) : <LoadingScreen text="Opening registration page" />
        }
    </Base>);

};

export default RegisterPage;