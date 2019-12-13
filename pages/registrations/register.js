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

const RegisterPage = () => {
    const router = useRouter();
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoading] = useState(false);
    const [data, setData] = useState();
    const [isError, setError] = useState(false);

    const [isTeamSelected, setTeamSelected] = useState(false);
    const [isFormFilled, setFormFilled] = useState(false);
    const [hasAgreed, setAgreed] = useState(false);
    const [hasRegistered, setRegistered] = useState(false);

    const [teamSelected, setTeam] = useState();
    const [formData, setFormData] = useState();

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
          {
              details
              isTeamEvent
              minTeamSize
              maxTeamSize
              formFields
              {
                 key
                 label
                 type
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
                setRegistered(true);
            })
        } else {
            variables = {
                "formData": formData,
                "productID": router.query.product,
            };
            submitReg(IndRegMutation, variables).then((response) => {
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
        {isError ?
            <LoadingScreen
                text="We couldn't load this page due to a error. Try again later, or if this error exists, contact web@vidyut.amrita.edu."
            />
            : isLoaded ? (
                <React.Fragment>
                    <TitleBar/>
                        < div className = "container p-0 my-4" >
                        < h1 className="my-4 pt-4 mx-md-0 mx-4">{data.product.name} Registration</h1>
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
                                    /> : setFormFilled(true)
                            }
                        </Shade> : !hasAgreed ?
                            <Shade key="agreement">
                                <UserAgreement
                                    content={data.product.details.details}
                                    onAgree={() => setAgreed(true)}
                                    onClickBack={() => setFormFilled(false)}
                                />
                            </Shade> : !hasRegistered ?
                                <Shade key="preview">
                                    <SubmissionPreview
                                        formData={formData}
                                        team={teamSelected}
                                        onSubmit={handleSubmit}
                                        onClickBack={() => setAgreed(false)}
                                    />
                                </Shade> : <Shade key="preview">
                                    <div className="card-shadow p-4">
                                        <StatusContainer
                                            image={require('../../images/illus/confirmation.png')}
                                            title="Registered Successfully"
                                            text="Thank you for registering, and we look forward to meet you at Vidyut 2020"
                                            buttons={<div>
                                                <Link href="/registrations/my-registrations">
                                                    <button className="btn btn-primary font-weight-bold mr-2">View My
                                                        Registrations
                                                    </button>
                                                </Link>
                                                <Link href="/dashboard">
                                                    <button className="btn btn-primary font-weight-bold">Open Dashboard</button>
                                                </Link>
                                            </div>}
                                        />
                                    </div>
                                </Shade>
                    }
                    </PoseGroup>
                    </div>
                    <Footer/>
                </React.Fragment>
            ) : <LoadingScreen text="Opening registration page" />
        }
    </Base>);

};

export default RegisterPage;