import React, {useEffect, useState} from "react";
import classNames from 'classnames';
const _ = require('lodash');
import moment from "moment";

import dataFetch from "../../utils/dataFetch";
import '../../styles/cards/notification.sass';

const NotificationCard = () => {
    const [isQueried, setQueried] = useState(false);
    const [data, setData] = useState(false);

    const query = `{
      myNotifications
      {
        text
        url
        timestamp
        category
        type
      }
    }`;

    const getMyNotifications = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried)
        {
            getMyNotifications().then((response) =>{
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(_.sortBy(response.data.myNotifications, o => o.timestamp).reverse());
                }
            })
        }
    });

    const renderNotification = (n) => (
        <a
            href={n.url ? n.url : null}
            className={classNames(
                `notification plain-link`,
                n.type ? `type-${n.type}` : null
            )}
        >
            <div className="d-flex">
                {
                    n.category === 'transaction'?
                        <img src={require('../../images/icons/receive-cash.png')} />
                        : n.category === 'profile' ?
                        <img src={require('../../images/icons/profile.png')} />
                        : n.category === 'registration' ?
                            <img src={require('../../images/icons/check-list.png')} />
                            : <img src={require('../../images/icons/info.png')} />
                }
                <div>
                    {n.text}
                    <div className="notification-timestamp">{moment(n.timestamp).fromNow()}</div>
                </div>
            </div>
        </a>
    );

    return (
        <div className="notifications-card">
            {
                data && data.length > 0 ?
                    data.map(n => renderNotification(n))
                : null
            }
        </div>
    )

};

export default NotificationCard;