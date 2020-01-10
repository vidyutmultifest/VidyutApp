import React, {useEffect, useState} from "react";
import Head from "next/head";

import Base from "../../../components/base";
import AdminRequired from "../../../components/adminRequired";
import TitleBar from "../../../components/titleBar";
import dataFetch from "../../../utils/dataFetch";
import ContentCard from "../../../components/events/contentCard";
import {useRouter} from "next/router";

const RegistrationList = () => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);

    const query = `query registrationLister($type: String, $paidOnly: Boolean)
    {
      listRegistrations(eventType: $type)
      {
        name
        count
        {
          total
          paid
          paymentPending
          amritapurianPaid
        }
        registrations(isPaid: $paidOnly)
        {
          regID
          formData
          registrationTimestamp
          teamProfile
          {
            name
            members
            {
              firstName
              lastName
            }
          }
          userProfile
          {
            firstName
            lastName
            email
            isAmritapurian
            college { name }
          }
        }
      }
    }`;

    const getRegistrationList = async variables => await dataFetch({ query, variables });
    const router = useRouter();

    useEffect(() => {
        if(!isQueried)
        {
            const paidOnly = router.query.isPaid;
            const type = router.query.type;
            if(paidOnly !== undefined && type !== undefined )
            {
                getRegistrationList({
                    paidOnly, type
                }).then((response) =>{
                    setQueried(true);
                    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                        setData(response.data.listRegistrations);
                        setLoaded(true)
                    }
                })
            }
        }
    });

    const renderProfile = (profile, formData) => {
        let form = [];
        if(formData && formData !== null && formData !== "false")
            form = JSON.parse(formData.replace(/'/g, '"'));
        return (
            <ContentCard
                title={<h6>
                    {profile.firstName} {profile.lastName}
                    <div className="badge badge-primary mx-2">{profile.isAmritapurian ? 'A' : 'O'}</div>
                </h6>}
                node={
                    <div>
                        <div className="alert alert-secondarmb-2">
                            <b className="mb-2">Participant Profile</b>
                            <div>
                                <img src={require('../../../images/icons/university.png')} style={{ width: '32px' }} />
                                {profile.college ? profile.college.name : "n/a"}
                            </div>
                            <div>
                                <img src={require('../../../images/icons/email.png')} style={{ width: '32px' }} />
                                {profile.email ? profile.email : "n/a"}
                            </div>
                        </div>
                        {
                            form.length > 0 ?
                            <div className="alert alert-secondary">
                                <b className="mb-2">Form Data</b>
                                {
                                    form.map(f => <div className="pt-2">
                                        <div className="font-weight-bold pb-2">{f.label}</div>
                                        <div>{f.value ? f.value : 'no response'}</div>
                                    </div>)
                                }
                            </div> : null
                        }
                    </div>
                }
            />
        );
    };

    const renderCard = (c) => (
        <div className="pt-4">
            <ContentCard
                title={
                    <div className="d-inline">
                        <h5 className="d-inline">{c.name}</h5>
                        <div className="badge badge-success ml-2" style={{ fontSize: '1rem' }}>{c.count.paid}</div>
                        <div className="badge badge-primary ml-2" style={{ fontSize: '1rem'}}>{c.count.paid - c.count.amritapurianPaid}</div>
                        <div className="badge ml-2 text-light" style={{ fontSize: '1rem',  backgroundColor: '#a4123f' }}>{c.count.amritapurianPaid}</div>
                    </div>
                   }
                node={
                    <div>
                        <div>
                            <li><b>Total Registrations</b>: {c.count.total}</li>
                            <li><b>Paid Registrations</b>: {c.count.paid}</li>
                            <li><b>Outside Campus Paid</b>: {c.count.paid - c.count.amritapurianPaid}</li>
                            <li><b>Inside Campus Paid</b>: {c.count.amritapurianPaid}</li>
                        </div>
                        <div className="row mx-0 mt-4">
                        {
                            c.registrations.map((r) =>
                                 r.teamProfile ?
                                     <div className="col-12">
                                        <ContentCard
                                            title={r.teamProfile.name}
                                            classNames="mt-4"
                                            node={
                                                <div>
                                                    <li><b>Registrations ID</b>: { r.regID }</li>
                                                    <div className="row m-0">
                                                        {
                                                            r.teamProfile.members.map( m =>
                                                                <div className="col-6">
                                                                    { renderProfile(m, null) }
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            }
                                        />
                                     </div> : r.userProfile ?
                                     <div className="col-6 p-2">
                                         {renderProfile(r.userProfile, r.formData)}
                                     </div> : null
                            )
                        }
                        </div>
                    </div>
                }
            />
        </div>

    );

    return <Base loginRequired>
        <Head>
            <title>Registration List | Vidyut 2020 | National Level Multifest</title>
        </Head>
        <AdminRequired>
            <TitleBar />
            <div className="container py-4">
                { isLoaded && data ?
                    <div>
                        <h2>Registration List</h2>
                        <div>
                            Showing
                            {
                                router.query.type === 'competition' ? <b> competition </b> :
                                router.query.type === 'workshop' ? <b> workshop </b> :
                                null
                            }
                            registrations
                            {
                                router.query.isPaid === '1' ? <React.Fragment> with <b>paid</b> transactions.</React.Fragment> :
                                    router.query.isPaid === '0' ? <React.Fragment> with <b>unpaid</b> transactions.</React.Fragment>
                                    : null
                            }
                            {
                                router.query.isPaid == null && router.query.type ?
                                    'with no filters applied' : null
                            }
                        </div>
                        { data.map(c => renderCard(c)) }
                    </div>
                    : null }
            </div>
        </AdminRequired>
    </Base>
};

export default RegistrationList;