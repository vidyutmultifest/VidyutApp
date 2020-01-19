import React, {useEffect, useState} from "react";
import dataFetch from "../../../utils/dataFetch";
import '../../../styles/events/scroll-selector.sass';
import Collapse from "../../../components/common/collapse";
import Select from "react-select";
const classNames = require("classnames");
const shortid = require('shortid');

const DepartmentSelector = ({ onSelect }) => {
    const [isQueried, setQueried] = useState(false);
    const [data, setData] = useState(false);
    const [selected, setSelected] = useState(false);

    const query = `{
      listDepartments
      {
        label: name
        value: slug
        icon
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

    return data ? <Collapse
        title="Department"
        opened
        content={<Select
            className="basic-single my-2 w-100"
            classNamePrefix="select"
            isSearchable={false}
            placeholder="Select Department"
            name="department"
            onChange={(newValue) => {
                setSelected(newValue);
                onSelect(newValue.value !== '' ? newValue.value : false);
            }}
            options={[{label: 'All Departments', value: ''},...data]}
        />}
    />
    : null
};

export default DepartmentSelector;