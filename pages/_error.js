import React from 'react'
import "../styles/errorpage.sass"

const NotFoundPage = () => {
    return <div id="not-found-page" className="bg-gradient">
        <div className="container">
            <h1>Page Not Found</h1>
            <p>
                This page does not exist or has been moved. Please check the url,
                if you think this is due to a error please contact web@vidyut.amrita.edu.
            </p>
        </div>
    </div>
};

export default NotFoundPage
