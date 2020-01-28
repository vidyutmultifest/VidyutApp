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

    const [hasLoginIssues, setHasLoginIssues] = useState(false);
    const [needsPassword, setNeedsPassword] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
        Login(NormalLogin, {
            username,
            password
        }).then(response => {
            console.log(response);
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                cookies.set('token', response.data.tokenAuth.token, { path: '/' });
                cookies.set('refreshToken', response.data.tokenAuth.refreshToken, { path: '/' });
                cookies.set('username', username, { path: '/' });
                router.push('/explore');
            } else {
                setAuthFail(true);
                console.log(response);
                setLoading(false);
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

    const NormalLoginCard = (
        <div className="card-shadow px-2 py-4">
            <h3 className="mb-4">
                Login to Vidyut
            </h3>
            <div className="form-group">
                <label htmlFor="username"/>
                <input
                    placeholder="Enter Username"
                    className="p-2"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password"/>
                <input
                    placeholder="Enter Password"
                    className="p-2"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
            </div>
            <div className="px-4">
                <button
                    onClick={handleSubmit}
                    className="btn btn-primary btn-block px-4 py-2 rounded-0 font-weight-bold"
                >
                    Login
                </button>
                <button
                    onClick={() => setNeedsPassword(true)}
                    className="plain-button font-weight-bold my-2 text-danger p-2"
                >
                    Forgot / Generate Password
                </button>
            </div>
        </div>
    );

    const [email, setEmail] = useState('');
    const resetQuery = `query emailPassword($email: String!){
      emailPassword(email: $email)
    }`;
    const handleConfirmationRequest = () => {
        setNeedsPassword(false);
        Login(resetQuery, {email});
    };

    const renderForgotPassword = (
        <div className="card-shadow px-2 py-4" style={{ minWidth: '300px' }}>
            <h6 className="mb-4">
                Forgot / Generate Password
            </h6>
            <div className="form-group">
                <label htmlFor="email"/>
                <input
                    placeholder="Enter Registered Email"
                    className="p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                />
            </div>
            <div className="px-4">
                <button
                    onClick={handleConfirmationRequest}
                    className="btn btn-primary font-weight-bold btn-block my-2 rounded-0 p-2"
                >
                    Request Email
                </button>
            </div>
        </div>
    );

    const SSOCards = (<React.Fragment>
        <div className="my-2" onClick={() => setLoading(true)}>
            <NoSSR>
                <MicrosoftLogin
                    clientId="2e69cb85-310f-4339-aba9-1919ad5929b7"
                    authCallback={loginWithMicrosoft}
                    redirectUri={url}
                    children={<button className="login-button-microsoft">
                        <img src={require('../images/logos/microsoft.png')}/>
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
                        <img src={require('../images/logos/facebook.png')}/>
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
                            <img src={require('../images/logos/google.png')}/>
                            Login with Google
                        </div>}
                    />
                ) : null
            }
        </div>
    </React.Fragment>);

    return !isLoading && isLoaded ? (<LoginPageWrapper>
               <div id="login-card" className="text-center">
               {authFail ? errorMessage : null}
                <div
                    className="social-login-buttons p-0"
                    style={{
                        height: '90vh',
                        top: 0,
                        left: 0,
                        position: 'initial',
                        width: '100vw',
                        backgroundImage: `url('${require('../images/aoc/login-cover.jpg')}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', height: '100%' }} className="d-flex align-items-center justify-content-center">
                        {
                            !needsPassword ?
                                <div className="card-shadow p-4" style={{backgroundColor: '#4A148C'}}>
                                    {
                                        hasLoginIssues ?
                                            NormalLoginCard
                                            : null
                                    }
                                    {SSOCards}
                                    {
                                        !hasLoginIssues ?
                                            <button
                                                onClick={() => setHasLoginIssues(true)}
                                                className="font-weight-bold p-2 plain-button text-light"
                                            >
                                                Login with Username & Password
                                            </button> : null
                                    }
                                </div>
                            : renderForgotPassword
                        }
                    </div>
                </div>
           </div>
    </LoginPageWrapper>) : <LoadingScreen text={setQueried ? "Logging you in. If it takes too long, please try again later." : "Hold on, while we are opening the login page"} />

}

export default LoginPage;
