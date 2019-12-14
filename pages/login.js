import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import { GoogleLogin } from 'react-google-login';
import NoSSR from '../components/noSSR';
import MicrosoftLogin from "react-microsoft-login";
import { FacebookProvider, LoginButton } from 'react-facebook';

import '../styles/login.sass'

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
        setURL(window.location.href);
        const token = cookies.get('token');
        if (token != null) {
            router.push('/dashboard');
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
                        router.push('/dashboard');
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
                router.push('/dashboard');
            } else {
                setAuthFail(true);
                setErrorMessage('Login has failed');
                setLoading(false);
            }
        });
    };

    const loginWithMicrosoft =  (err, data) => {
        console.log('Microsoft Login Error', err);
        console.log('Microsoft Auth Data', data);
        const variables = { accessToken: data.authResponseWithAccessToken.accessToken };
        Login(MicrosoftAuthLogin, variables).then(response => {
            console.log('Server Response', response);
            if(!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                cookies.set('token', response.data.socialAuth.token, { path: '/' });
                cookies.set('username', response.data.socialAuth.user.username, { path: '/' });
                router.push('/dashboard');
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
                router.push('/dashboard');
            } else {
                setAuthFail(true);
                setErrorMessage('Login has failed');
                setLoading(false);
            }
        });
    };

    return !isLoading && isLoaded ? (<LoginPageWrapper>
               <div id="login-card" className="text-center">
               <img src={require('../images/logos/vidyut-dark-logo.png')}  className="logo" style={{ width: '100%' }}/>
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
                                clientId="74361786264-v858k0po050aon4fqf27ehrcin9un4ga.apps.googleusercontent.com"
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
           </div>
    </LoginPageWrapper>) : <LoadingScreen text={setQueried ? "Logging you in. If it takes too long, please try again later." : "Hold on, while we are opening the login page"} />

}

export default LoginPage;
