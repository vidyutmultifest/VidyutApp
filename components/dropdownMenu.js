import React, {useState} from "react";

const DropdownMenu = ({ item, onClick, isOpen }) => {

    return (
        <button className="titlebar-menu-item" onClick={onClick}>
            {item.title}
            {
                isOpen ?
                    <img src={require('../images/icons/chevron-up.png')} className="icon-img" />
                    : <img src={require('../images/icons/chevron-down.png')} className="icon-img" />
            }
            {
                isOpen ? <div className="dropdown-options card-shadow rounded">
                    {
                        item.items.map(i =>
                            <div>
                                <a href={i.link}  target={i.newTab ? "_blank" : null}>{i.name}</a>
                            </div>
                        )
                    }
                </div> : null
            }
        </button>
    )
};

export default DropdownMenu;