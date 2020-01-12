import React, {useState} from "react";
import ContentCard from "../../components/events/contentCard";
import classNames from 'classnames';

const CategorySelector = ({ data, onSelect }) => {
    const [selected, setSelected] = useState(false);

    return data ? <ContentCard
            title="Filter by Category"
            classNames="bg-gradient mb-0"
            isOpen
            node={
                <div className="scroll-selector">
                    <div className="scroll-wrapper">
                        {
                            data.map(d => (
                                <a onClick={() => {
                                    if(selected===d.slug)
                                    {
                                        setSelected(false);
                                        onSelect(false);
                                    } else {
                                        setSelected(d.slug);
                                        onSelect({ slug: d.slug })
                                    }
                                }}>
                                    <div className={classNames('scroll-item card-shadow p-2 m-2 text-center', selected === d.slug ? 'selected' : null)}>
                                        <div>
                                            {/*{ d.icon ? <img src={d.icon} className="mb-3" /> : null }*/}
                                            <h6>{d.name}</h6>
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

export default CategorySelector;