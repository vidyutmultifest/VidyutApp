import React, {useEffect, useState} from "react";
import dataFetch from "../../utils/dataFetch";
import '../../styles/events/scroll-selector.sass';
import ContentCard from "../../components/events/contentCard";
const classNames = require("classnames");

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
                console.log(response);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.listDepartments);
                }
            })
        }
    });


    return data ? <ContentCard
        title="Filter by Department"
        classNames="bg-gradient mb-0"
        isOpen
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
                            <div className={classNames('scroll-item card-shadow p-2 m-2 text-center', selected === d.value ? 'selected' : null)}>
                                <div>
                                    { d.icon ? <img src={d.icon} className="mb-3" /> : null }
                                    <h6>{d.label}</h6>
                                </div>
                            </div>
                        </a>
                    ))
                }
            </div>
        </div>}
    />
    : null
};

export default DepartmentSelector;