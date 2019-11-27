import React from "react";

const DashboardFooter = () => (
    <footer>
        <div className="row m-0">
            <div className="col-md-4" />
            <div className="col-md-4 text-center">
                <div className="amfoss-credit">
                    <div>Proudly Powered by</div>
                    <a href="https://amfoss.in/">
                        <img
                            src={require('../../images/logos/amfoss_logo_light.png')}
                            style={{
                                filter: 'brightness(0.1)'
                            }}
                        />
                    </a>
                </div>
            </div>
            <div className="col-md-4" />
        </div>
    </footer>
);

export default DashboardFooter;