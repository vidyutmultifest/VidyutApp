import React from "react";
import Base from "../../components/base";
import Topbar from "../../components/common/topbar";
import MenuBar from "../../components/common/menubar";
import BottomBar from "../../components/common/bottombar";
import PurchaseHistory from "../../components/cards/purchaseHistory";

export default () => (
    <Base loginRequired>
        <Topbar/>
        <MenuBar/>
        <div className="container p-0">
            <h4 className="p-2">My Orders</h4>
            <PurchaseHistory />
        </div>
        <div style={{ height: '20vh' }} />
        <BottomBar
            currentTabIcon={require('../../images/icons/order-bottom-bar-icon.png')}
            currentTabName="Orders"
        />
    </Base>
);