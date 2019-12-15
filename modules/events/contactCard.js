import React from "react";

const ContactCard = ({ contacts }) => contacts && contacts.length > 0 ? (
    <div id="contacts-card" className="card-shadow p-4 my-4">
        <h4>Contacts</h4>
        {
            contacts.map(c => (
                <div className="py-2">
                    <div className="contactName">{c.name}</div>
                    {
                        c.phone ?
                            <div className="contactPhone"><img src={require('../../images/icons/ringing-phone.png')} />
                                <a href={`tel:${c.phone}`}>{c.phone}</a>
                            </div>
                            : null
                    }
                    {
                        c.email ?
                        <div className="contactEmail"><img src={require('../../images/icons/email-send.png')} />
                            <a href={`mailto:${c.email}`}>{c.email}</a>
                        </div>
                        : null
                    }
                </div>
            ))
        }
    </div>
) : null;

export default ContactCard;