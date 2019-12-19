import React, {useEffect, useState} from "react";
import dataFetch from "../../utils/dataFetch";
import Select from 'react-select';

const DepartmentSelector = ({ onSelect }) => {
    const [isQueried, setQueried] = useState(false);
    const [data, setData] = useState(false);

    const query = `{
      listDepartments
      {
        label: name
        value: slug
      }
    }`;

    const getDepartments = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried)
        {
            getDepartments().then(  response => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.listDepartments);
                }
            })
        }
    });

    return data ? <Select
        options={data}
        isClearable
        onChange={(e) => onSelect(e)}
    /> : null
};

export default DepartmentSelector;