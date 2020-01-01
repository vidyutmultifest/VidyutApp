import React from "react";
import Link from "next/link";

const DashboardFooter = () => (
    <footer>
        <div className="row mx-0 my-4 py-4">
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
                    <div className="pb-4 pt-2">
                        <Link href="/coc">
                            <a>Code of Conduct</a>
                        </Link>|
                        <Link href="/terms">
                            <a>Terms</a>
                        </Link>|
                        <Link href="/privacy">
                            <a>Privacy</a>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <a href="https://t.me/vcare2020">
                    <div id="chat-button">
                        <img src={require('../../images/icons/chat-support.png')} />
                    </div>
                </a>
            </div>
        </div>
    </footer>
);

export default DashboardFooter;