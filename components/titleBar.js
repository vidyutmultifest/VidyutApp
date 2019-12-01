import React from "react";
import Link from "next/link";

import '../styles/bootstrap.sass';
import Cookies from "universal-cookie";

const cookies = new Cookies();

const TitleBar = () => {
    const token = cookies.get('token');
    const isLoggedIn = token != null;
    return <nav>
        <div className="row m-0">
            <div className="col-lg-2 col-md-3 col-8">
                <Link href="/dashboard"><img src={require('../images/logos/vidyut-dark-logo.png')} /></Link>
            </div>
            <div className="col text-right">
                {
                   isLoggedIn ?
                       <Link href="/logout"><a>Logout</a></Link>
                       :  <Link href="/login"><a>Login</a></Link>
                }
            </div>
        </div>
    </nav>
};

export default TitleBar;