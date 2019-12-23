import React, {useEffect, useState} from "react";
import dataFetch from "../../utils/dataFetch";
import Select, { components } from 'react-select';
const { Option } = components;

const OrganizerSelector = ({ onSelect }) => {
    const [isQueried, setQueried] = useState(false);
    const [data, setData] = useState(false);

    const customSingleValue = (props) => (
        <Option {...props}>
            <div className="input-select__single-value d-flex">
                <div style={{ width: "20%"}}>
                    <img src={ props.data.icon ? props.data.icon : require('../../images/icons/company.png')} style={{ width: "45px", marginRight: "1rem"}} />
                </div>
                <div style={{ width: "80%", color: "black"}}>
                    <span >{ props.label }</span >
                </div>
            </div>
        </Option>
    );

    
    const query = `{
      listOrganizers
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

    return data ? <Select
        options={data}
        isClearable
        onChange={(e) => onSelect(e)}
        components={{ Option: customSingleValue }}
    /> : null
};

export default OrganizerSelector;