import React, {useEffect, useState} from "react";
import dataFetch from "../../utils/dataFetch";
import {CSVLink} from "react-csv";
import TeamProfileCard from "./TeamProfileCard";
import RegProfileCard from "./RegProfileCard";

const RegDetails = ({ id }) =>
{
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);

    const query = `query getRegistrations($eventID: Int!){
      getRegistrations(eventID: $eventID)
      {
            regID
          formData
          registrationTimestamp
          teamProfile
          {
            name
            allowEditing
            hash
            leader
            {
              firstName
              lastName
              phone
              email
              vidyutID
              college
              {
                name
              }
            }
            members
            {
              firstName
              lastName
              vidyutID
            }
          }
          transaction { 
            isPaid
            isProcessed
            amount
            transactionID
          }
          userProfile
          {
            firstName
            lastName
            email
            phone
            vidyutID
            isAmritapurian
            college { name }
          }
      }
    }`;

    const getRegistrationList = async variables => await dataFetch({ query, variables });

    useEffect(() => {
        if(!isQueried)
        {
            getRegistrationList({
               eventID: id
            }).then((response) =>{
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.getRegistrations);
                    setLoaded(true)
                }
            })
        }
    });


    const getCSV = (r) => {
        const list = [];
        r.map(r => {
            list.push({
                name: r.userProfile ? r.userProfile.firstName + ' ' + r.userProfile.lastName : r.teamProfile.name,
                college: r.userProfile ? r.userProfile.college ? r.userProfile.college.name : null : r.teamProfile.leader.college ?  r.teamProfile.leader.college.name : null,
                email: r.userProfile ? r.userProfile.email : r.teamProfile.leader.email,
                phone: r.userProfile ? r.userProfile.phone : r.teamProfile.leader.phone,
                vidyutID: r.userProfile ? r.userProfile.vidyutID : r.teamProfile.leader.VidyutID,
                regID: r.regID,
                timestamp: r.registrationTimestamp,
                transactionID: r.transaction ? r.transaction.transactionID : null,
                transactionAmount: r.transaction ? r.transaction.amount : null,
                transactionStatus: r.transaction ? r.transaction.isPaid ? 'Paid' : r.transaction.isProcessed ? 'Not Paid' : 'Unprocessed' : 'Not Attempted'
            })
        });
        return list;
    };

    return (
        <div>

            {
                data ?
                    <CSVLink data={getCSV(data)} filename={`export_list_registration_data.csv`}>
                        <button className="btn btn-warning btn-shadow rounded-0 m-2">Download Data</button>
                    </CSVLink> : null
            }

            <div className="row mx-0 mt-4">
                {
                    data ? data.map((r) =>
                        r.teamProfile ?
                            <div className="col-12 p-2">
                                <TeamProfileCard
                                    teamProfile={r.teamProfile}
                                    formData={r.formData}
                                    transaction={r.transaction}
                                    regID={r.regID}
                                    timestamp={r.registrationTimestamp}
                                />
                            </div> : r.userProfile ?
                            <div className="col-md-6 col-12 p-2">
                                <RegProfileCard
                                    profile={r.userProfile}
                                    formData={r.formData}
                                    transaction={r.transaction}
                                    regID={r.regID}
                                    timestamp={r.registrationTimestamp}
                                    showTransactionDetails
                                />
                            </div> : null
                    ) : null
                }
            </div>
        </div>

    )

};

export  default  RegDetails;