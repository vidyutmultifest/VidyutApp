import React from "react";

import Base from "../components/base";
import Topbar from "../components/common/topbar";
import MenuBar from "../components/common/menubar";
import BottomBar from "../components/common/bottombar";

import TeamTerms from "../modules/team/teamTerms";
import ListTeams from "../modules/team/listTeams";
import CreateTeam from "../modules/team/createTeam";
import JoinTeam from "../modules/team/joinTeam";
import Head from "next/head";

export default () => (
    <Base loginRequired>
        <Head>
            <title> My Teams | Vidyut 2020 | National Level Multifest - Amrita Vishwa Vidyapeetham, Amritapuri Campus</title>
        </Head>
        <Topbar/>
        <MenuBar/>
        <div className="container p-0">
            <h4 className="p-2">Team Manager</h4>
            <div className="p-2">
                <TeamTerms />
            </div>
            <ListTeams />
            <div className="row m-0">
                <div className="col-md-6 p-2">
                    <CreateTeam />
                </div>
                <div className="col-md-6 p-2">
                    <JoinTeam />
                </div>
            </div>
        </div>
        <div style={{ height: '20vh' }} />
        <BottomBar
            currentTabIcon={require('../images/icons/user-group-bottom-bar-icon.png')}
            currentTabName="My Teams"
        />
    </Base>
);