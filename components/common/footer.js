import React from "react";
import Link from "next/link";

const DashboardFooter = () => {

    return (
        <footer>
            <div className="row mx-0 my-4 py-4">
                <div className="col-md-4" />
                <div className="col-md-4 text-center">
                    <div className="amfoss-credit">
                        <div className="pb-2 small-text">Proudly Powered by</div>
                        <a href="https://amfoss.in/">
                            <img
                                src={require('../../images/logos/amfoss_logo_light.png')}
                                style={{
                                    filter: 'brightness(0.1)'
                                }}
                            />
                        </a>
                        <div className="pb-4 pt-2">
                            <a href="/coc">Code of Conduct</a>|
                            <a href="/terms">Terms</a>|
                            <a href="/privacy">Privacy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )

};

export default DashboardFooter;