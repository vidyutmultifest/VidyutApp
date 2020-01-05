import React, {useState} from "react";
const classnames = require('classnames');

const ContentCard = ({ title, content, node, icon, classNames, isOpen: opened }) => {

    const [isOpen, setOpen] = useState(opened ? opened : false);

    return content && content.length > 0 || node ? (
        <div className={classnames("card-shadow rounded p-4", classNames)}>
            <div className="row m-0">
                <div className="col-9 d-flex align-items-center px-0">
                    <h5 className="m-0">
                        { icon ? <img src={icon} style={{ width: "2rem" }} className="icon-img m-2" /> : null }
                        {title}
                    </h5>
                </div>
                <div className="col-3 d-flex justify-content-end align-items-center">
                {
                    !isOpen ?
                        <a onClick={() => setOpen(true)}>
                            <img src={require('../../images/icons/chevron-down.png')} style={{ width: "40px"}} />
                        </a>
                        :  <a onClick={() => setOpen(false)}>
                            <img src={require('../../images/icons/chevron-up.png')} style={{ width: "40px"}} />
                        </a>
                }
                </div>
            </div>
            { isOpen ? node ? node : <div className="mt-4" dangerouslySetInnerHTML={{ __html: content}} />  : null }
        </div>
    ) : null

};

export default ContentCard;