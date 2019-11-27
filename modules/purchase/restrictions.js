import React from "react";
import '../../styles/purchase/restrictions.sass';

const RestrictionsCard = () => {

    const card = (title, image, text) => (
        <div className="restriction-item card-shadow">
            <img src={image} />
            <h4>{title}</h4>
            <p>{text}</p>
        </div>
    );

    return (<div id="event-restrictions" className="card-shadow">
        <h3 className="mb-4">Rules & Regulations</h3>
        <div className="d-flex justify-content-center">
            <p className="warning-text">
                By purchasing the tickets to the Vidyut 2020 Proshows, you are agreeing to the following rules and regulations and our code of conduct.
                Individuals failing to meet the rules shall not be admitted inside the venue even if they own a ticket. Its the sole discretion of the Vidyut
                Organizers and Amrita to deny entry to an individual if it feels. Whatsoever, no refund for the ticket will be issued, your purchase now is
                final.
            </p>
        </div>
        <div className="wrapper">
            <div className="row m-0">
                <div className="col-lg-3 col-md-4 col-6 p-2">
                    {card(
                        'Zero Tolerance',
                        require('../../images/icons/forbidden-items.jpg'),
                            'Seriously dealt with'
                     )}
                </div>
                <div className="col-lg-3 col-md-4 col-6 p-2">
                    {card(
                        'ID Proof Required',
                        require('../../images/icons/id-verified.png'),
                            'Original college ID card & govt. ID card needs to be produced at the venue'
                    )}
                </div>
                <div className="col-lg-3 col-md-4 col-6 p-2">
                    {card(
                        'Access only to College Students',
                        require('../../images/icons/no-entry.png'),
                        'Event is exclusive for college students, outsiders will not be allowed to enter the venue'
                    )}
                </div>
                <div className="col-lg-3 col-md-4 col-6 p-2">
                    {card(
                        'Strict Disciplinary Actions',
                        require('../../images/icons/policeman-male.png'),
                        'Students violating the code of conduct will be strictly dealt with.'
                    )}
                </div>
                <div className="col-lg-3 col-md-4 col-6 p-2">
                    {card(
                        'No Refund',
                        require('../../images/icons/cash-in-hand.png'),
                        'No refund will be provided once the ticket has been booked, whatsoever the reason be.'
                    )}
                </div>
                <div className="col-lg-3 col-md-4 col-6 p-2">
                    {card(
                        'Non Transferable',
                        require('../../images/icons/transfer-between-users.png'),
                        'Tickets bought by a student cannot be transferred, and will be strictly scrutinized.'
                    )}
                </div>
            </div>
        </div>
    </div>)
};

export default RestrictionsCard;