import React, { useState, useEffect } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import { GoogleLogin } from 'react-google-login';
import MicrosoftLogin from "react-microsoft-login";
import NoSSR from '../components/noSSR';

import '../styles/login.sass'

import dataFetch from "../utils/dataFetch"
import LoginPageWrapper from "../wrappers/LoginPage"

const cookies = new Cookies();

function LoginPage(props) {
    const router = useRouter();
    const [url, setURL] = useState();
    const [isLoading, setLoading] = useState(false);
    const [authFail, setAuthFail] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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

    useEffect(() => {
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
                    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                        cookies.set('token', response.data.tokenAuth.token, { path: '/' });
                        cookies.set('refreshToken', response.data.tokenAuth.refreshToken, { path: '/' });
                        cookies.set('username', values.username, { path: '/' });
                        router.push('/dashboard');
                    } else {
                        setAuthFail(true);
                        setErrorMessage('Login has failed');
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

    const loginWithMicrosoft = (err, data) => {
        const variables = { accessToken: data.authResponseWithAccessToken.accessToken };
        Login(MicrosoftAuthLogin, variables).then( response => {
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

    return <LoginPageWrapper>
       {
           !isLoading ? (<div id="login-card">
               <img src={require('../images/logos/vidyut-dark-logo.png')} />
               {authFail ? errorMessage : null}
                <div className="social-login-buttons">
                    <div>
                        <NoSSR>
                            <MicrosoftLogin
                                clientId="2e69cb85-310f-4339-aba9-1919ad5929b7"
                                authCallback={loginWithMicrosoft}
                                debug="true"
                                redirectUri={url}
                                children={<button className="login-button-microsoft">
                                    <img src={require('../images/logos/microsoft.png')} />
                                    Login with Amrita ID
                                </button>}
                            />
                        </NoSSR>
                    </div>
                    <div>
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
                    </div>
                </div>
           </div>) : <h1>Loading</h1>
       }
    </LoginPageWrapper>
}

export default LoginPage;
