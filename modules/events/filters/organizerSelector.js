import React, {useEffect, useState} from "react";
import dataFetch from "../../../utils/dataFetch";
const shortid = require('shortid');


import Collapse from "../../../components/common/collapse";
const classNames = require("classnames");

import Select from 'react-select';

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

    return data ? <Collapse
            title="Organizer"
            opened
            content={
                <Select
                    className="basic-single my-2 w-100"
                    classNamePrefix="select"
                    placeholder="Select Organizer"
                    name="organizer"
                    onChange={(newValue) => {
                        setSelected(newValue);
                        onSelect(newValue.value !== '' ? newValue.value : false);
                    }}
                    options={[{label: 'All Organizers', value: ''},...data]}
                />
            }
       /> : null
};

export default OrganizerSelector;