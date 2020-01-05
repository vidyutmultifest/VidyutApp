import React, {useEffect, useState} from "react";
import dataFetch from "../../utils/dataFetch";

import '../../styles/events/scroll-selector.sass';
import ContentCard from "../../components/events/contentCard";
const classNames = require("classnames");

const OrganizerSelector = ({ onSelect }) => {
    const [isQueried, setQueried] = useState(false);
    const [data, setData] = useState(false);
    const [selected, setSelected] = useState(false);

    const query = `{
      listOrganizers(hasWorkshop: true)
      {
        label: name
        value: id
        icon: logo
      }
    }`;

    const getOrganizers = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried)
        {
            getOrganizers().then(  response => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.listOrganizers);
                }
            })
        }
    });

    return data ? <ContentCard
            title="Filter by Organizer"
            classNames="bg-gradient"
            node={
                <div className="scroll-selector">
                    <div className="scroll-wrapper">
                        {
                            data.map(d => (
                                <a onClick={() => {
                                    if(selected===d.value)
                                    {
                                        setSelected(false);
                                        onSelect(null);
                                    } else {
                                        setSelected(d.value);
                                        onSelect({ value: d.value })
                                    }
                                }}>
                                    <div className={classNames('scroll-item card-shadow p-4 m-2 text-center', selected === d.value ? 'selected' : null)}>
                                        <div>
                                            { d.icon ? <img src={d.icon} className="mb-3" /> : null}
                                            <h6>{d.label}</h6>
                                        </div>
                                    </div>
                                </a>
                            ))
                        }
                    </div>
                </div>
            }
       /> : null
};

export default OrganizerSelector;