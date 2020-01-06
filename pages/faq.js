import React, {useEffect, useState} from "react";
import Head from "next/head";

import dataFetch from "../utils/dataFetch";
import Base from "../components/base";
import TitleBar from "../components/titleBar";
import DashboardFooter from "../modules/dashboard/footer";
import ContentCard from "../components/events/contentCard";

const FAQPage = () => {
    const [isQueried, setQueried] = useState(false);
    const [data, setData] = useState(false);

    const query = `{
      viewQuestions
      {
        question
        answers
        {
          answer
        }
      }
    }`;

    const getQuestions = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried)
        {
            getQuestions().then(  response => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.viewQuestions);
                }
            })
        }
    });

    return <Base>
        <Head>
            <title>Frequently Asked Questions (FAQ) | Vidyut 2020 | National Level Multifest</title>
        </Head>
        <TitleBar
            breadcrumbs={[
                {
                    link: '/faq',
                    name: 'FAQ',
                    active: true
                }
            ]}
        />
        <div className="container p-2">
            <h3 className="my-4">Frequently Asked Questions (FAQ)</h3>
            {
                data && data.map(q => (
                  <ContentCard
                      title={q.question}
                      classNames="bg-primary text-light mt-4"
                      node={
                          <div className="mt-3">
                              {
                                  q.answers.map(a => (
                                      <div className="card-shadow my-2 p-3">
                                          {a.answer}
                                      </div>
                                  ))
                              }
                          </div>
                      }
                  />
                ))
            }
        </div>
        <DashboardFooter/>
    </Base>

};

export default FAQPage;