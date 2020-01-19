import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import { GoogleLogin } from 'react-google-login';
import NoSSR from '../components/noSSR';
import MicrosoftLogin from "react-microsoft-login";
import { FacebookProvider, LoginButton } from 'react-facebook';

import '../styles/login.sass'
import '../styles/bootstrap.sass'

import dataFetch from "../utils/dataFetch"
import LoginPageWrapper from "../wrappers/LoginPage"
import LoadingScreen from "../components/loadingScreen";

const cookies = new Cookies();

function LoginPage(props) {
    const router = useRouter();
    const [url, setURL] = useState();
    const [isLoading, setLoading] = useState(false);
    const [authFail, setAuthFail] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [status, setStatus] = useState(false);

    const query = `{
      status
      {
        googleSignIn
        facebookSignIn
      }
    }`;



    const getStatus = async () => await dataFetch({ query });


    const NormalLogin = `mutation TokenAuth($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
            refreshToken
        }
    }`;

    const GAuthLogin = `mutation googleLogin($accessToken: String!){
        socialAuth(accessToken: $accessToken, provider: "google-oauth2")
          {
            token
            user
            {
              username
            }
          }
    }`;


    const MicrosoftAuthLogin = `mutation microsoftLogin($accessToken: String!){
        socialAuth(accessToken: $accessToken, provider: "microsoft-graph")
          {
            token
            user
            {
              username
            }
          }
    }`;

    const FacebookAuthLogin = `mutation facebookLogin($accessToken: String!){
        socialAuth(accessToken: $accessToken, provider: "facebook-app")
          {
            token
            user
            {
              username
            }
          }
    }`;

    useEffect(() => {
        setURL(window.location.href);
        const token = cookies.get('token');
        if (token != null) {
            router.push('/explore');
        }
        if(!isQueried)
        {
            getStatus().then(  response => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setStatus(response.data.status);
                    setLoaded(true);
                }
            })
        }
    });

    const Login = async (query, variables) => await dataFetch({ query, variables });

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                Login(NormalLogin, values).then( response => {
                    console.log(response);
                    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                        cookies.set('token', response.data.tokenAuth.token, { path: '/' });
                        cookies.set('refreshToken', response.data.tokenAuth.refreshToken, { path: '/' });
                        cookies.set('username', values.username, { path: '/' });
                        router.push('/explore');
                    } else {
                        setAuthFail(true);
                        console.log(response);
                        setLoading(false);
                    }
                });
            }
        });
    };

    const loginWithGoogle = e => {
        const variables = { accessToken: e.accessToken };
        Login(GAuthLogin, variables).then( response => {
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                cookies.set('token', response.data.socialAuth.token, { path: '/' });
                cookies.set('username', response.data.socialAuth.user.username, { path: '/' });
                router.push('/explore');
            } else {
                setAuthFail(true);
                setErrorMessage('Login has failed');
                setLoading(false);
            }
        });
    };

    const loginWithMicrosoft =  (err, data) => {
        const variables = { accessToken: data.authResponseWithAccessToken.accessToken };
        Login(MicrosoftAuthLogin, variables).then(response => {
            console.log('Server Response', response);
            if(!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                cookies.set('token', response.data.socialAuth.token, { path: '/' });
                cookies.set('username', response.data.socialAuth.user.username, { path: '/' });
                router.push('/explore');
            } else {
                setAuthFail(true);
                setErrorMessage('Login has failed');
                setLoading(false);
            }
        });
    };

    const loginWithFacebook = (response) => {
        const variables = { accessToken: response.tokenDetail.accessToken };
        Login(FacebookAuthLogin, variables).then(response => {
            console.log('Server Response', response);
            if(!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                cookies.set('token', response.data.socialAuth.token, { path: '/' });
                cookies.set('username', response.data.socialAuth.user.username, { path: '/' });
                router.push('/explore');
            } else {
                setAuthFail(true);
                setErrorMessage('Login has failed');
                setLoading(false);
            }
        });
    };

    return !isLoading && isLoaded ? (<LoginPageWrapper>
               <div id="login-card" style={{ maxWidth: '400px' }} className="text-center m-2">
               <img alt="vidyut logo" src={require('../images/logos/vidyut-dark-logo.png')}  className="logo mb-0 pb-2" style={{ width: '100%' }}/>
               <div className="text-dark">
                   <h3 style={{ fontSize: `calc(1.2rem + 0.3vw)`}}>
                       NATIONAL LEVEL MULTIFEST <br />
                        <span style={{ color: '#E65100'}}>Jan 30 - Feb 1</span>
                   </h3>
                   <div style={{ fontSize: `calc(0.7rem + 0.3vw)`, lineHeight: 1.2}} className="font-weight-bold px-4 py-2 mb-4">
                       Create an account using Amrita ID or Google to register for competitions, workshop
                       and to purchase proshow tickets.
                   </div>
               </div>
               {authFail ? errorMessage : null}
                <div className="social-login-buttons">
                    <div onClick={() => setLoading(true)}>
                        <NoSSR>
                            <MicrosoftLogin
                                clientId="2e69cb85-310f-4339-aba9-1919ad5929b7"
                                authCallback={loginWithMicrosoft}
                                redirectUri={url}
                                children={<button className="login-button-microsoft">
                                    <img src={require('../images/logos/microsoft.png')} />
                                    Login with Amrita ID
                                </button>}
                            />
                        </NoSSR>
                    </div>
                    <div>{
                            status.facebookSignIn ? <FacebookProvider appId="2427065454211076">
                                <LoginButton
                                    scope="email"
                                    onCompleted={loginWithFacebook}
                                    onError={(e) => console.log(e)}
                                    className="login-button-microsoft"
                                >
                                    <div>
                                        <img src={require('../images/logos/facebook.png')} />
                                        Login with Facebook
                                    </div>
                                </LoginButton>
                            </FacebookProvider> : null
                    }
                    </div>
                    <div>
                    {
                        status.googleSignIn ? (
                            <GoogleLogin
                                clientId="929385656161-b49s4q6vuqmdvt8lvapq0tggu5rlmnrc.apps.googleusercontent.com"
                                onSuccess={loginWithGoogle}
                                icon={false}
                                cookiePolicy={'single_host_origin'}
                                className="login-button-google"
                                children={<div>
                                    <img src={require('../images/logos/google.png')} />
                                    Login with Google
                                </div>}
                            />
                        ) : null
                    }
                    </div>
                </div>
               <div className="text-dark px-3 pt-4 pb-3">
                   <img src={require('../images/logos/amrita-dark-logo.png')} />
                   <div className="font-weight-bold small-text mt-2">Kollam, Kerala</div>
               </div>
               <div className="alert text-dark alert-warning rounded-0 m-0 p-2 small-text text-left" style={{ fontSize: '0.7rem'}}>
                   <div className="mb-1">1. Proshow tickets can be purchased only after registering for a workshop / competition</div>
                   <div>2. Vidyut is open for Student/Faculty only. Bringing ID Card compulsory</div>
               </div>
           </div>
    </LoginPageWrapper>)
    : <LoadingScreen
        title="Vidyut 2020 | National Level Multifest"
        text={setQueried ? "Logging you in. If it takes too long, please try again later." : "Hold on, while we are opening the login page"}
    />

}

export default LoginPage;
