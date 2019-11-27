import React from "react";
import Link from "next/link";

const TitleBar = () => {
    return <nav>
        <div className="row m-0">
            <div className="col-lg-2 col-md-3 col-8">
                <img src={require('../images/logos/vidyut-dark-logo.png')} />
            </div>
            <div className="col text-right">
                <Link href="/logout"><a>Logout</a></Link>
            </div>
        </div>
    </nav>
};

export default TitleBar;