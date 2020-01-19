import React, {useState} from "react";
import '../../styles/common/collapse.sass';

const Collapse = ({ title, opened, content}) =>
{

    const [isOpen, setOpen] = useState(opened ? opened : false);

    return (
        <div className="collapse-component">
            <div className="row m-0"  onClick={() => setOpen(!isOpen)} style={{ cursor: 'pointer' }}>
                <div className="col-9 d-flex collapse-title align-items-center px-0">
                    {title}
                </div>
                <div className="col-3 d-flex justify-content-end align-items-center">
                    {
                        !isOpen ?
                            <img
                                src={require('../../images/icons/chevron-down-icon.png')}
                                onClick={() => setOpen(true)}
                            />
                            : <img
                                onClick={() => setOpen(false)}
                                src={require('../../images/icons/chevron-up-icon.png')}
                            />
                    }
                </div>
            </div>
            {
                isOpen ? content : null
            }
        </div>
    );

};

export default Collapse;