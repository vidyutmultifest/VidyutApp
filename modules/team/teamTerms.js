import React from "react";
import Collapse from "../../components/common/collapse";

const TeamTerms = () =>  <div className="alert alert-info p-2 mt-2 small-text"><Collapse
    title="How it Works & Team Rules"
    content={
            <div className="mt-4">
                <h6>How it Works</h6>
                <ol>
                    <li>Team leader creates a new team entering the name of the team using the <b>create team</b> option below.</li>
                    <li>Team leader copies the team code of the newly created team, and shares it with other members</li>
                    <li>Other members <b>join the team using the team code</b>, and all of them can now view and verify their teams.</li>
                    <li>Team leader is asked for selecting his team while trying to register for a team event.</li>
                </ol>
                <h6>Rules</h6>
                <ul>
                    <li>Only team leader is allowed to make registrations for the team</li>
                    <li>Team leader can make another member the leader of his already created team.</li>
                    <li>Team leader can change the name of the team, as well as remove members from his team</li>
                    <li>Teams cannot be edited once it has registered for any event.</li>
                    <li>Participants are allowed to make as many teams as they wish to.</li>
                </ul>
            </div>
        }
/></div>;

export default TeamTerms;