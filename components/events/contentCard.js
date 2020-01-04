import React, {useState} from "react";

const ContentCard = ({ title, content, icon }) => {

    const [isOpen, setOpen] = useState(false);

    return content && content.length > 0 ? (
        <div className="card-shadow rounded p-4 mb-4">
            <div className="row m-0">
                <div className="col-9 d-flex align-items-center px-0">
                    <h5 className="m-0">
                        <img src={icon} style={{ width: "2rem" }} className="icon-img m-2" />
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
            { isOpen ? <div className="mt-4" dangerouslySetInnerHTML={{ __html: content}} />  : null }
        </div>
    ) : null

};

export default ContentCard;