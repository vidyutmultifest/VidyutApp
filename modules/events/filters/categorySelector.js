import React, {useEffect, useState} from "react";
import classNames from 'classnames';
import Collapse from "../../../components/common/collapse";
import dataFetch from "../../../utils/dataFetch";
import Select from "react-select";
const shortid = require('shortid');

const CategorySelector = ({ onSelect }) => {
    const [isQueried, setQueried] = useState(false);
    const [data, setData] = useState(false);
    const [selected, setSelected] = useState(false);

    const query = `{
      listCategories
      {
        label: name
        value: slug
      }
    }`;

    const getCategories = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried)
        {
            getCategories().then(  response => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.listCategories);
                }
            })
        }
    });

    return data ? <Collapse
            title="Category"
            opened
            content={<Select
                className="basic-single rounded-0 my-2 w-100"
                classNamePrefix="select"
                placeholder="Select Category"
                onChange={(newValue) => {
                    setSelected(newValue);
                    onSelect(newValue.value !== '' ? newValue.value : false);
                }}
                name="category"
                options={[{label: 'All Categories', value: ''},...data]}
            />}
        />
        : null
};

export default CategorySelector;