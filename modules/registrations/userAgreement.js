import React, {useState} from "react";
import '../../styles/dashboard/style.sass';
import Link from "next/link";

const UserAgreement = ({ content, onAgree, onClickBack }) => {
    const [val, setVal] = useState(false);

    return (
        <div className="agreement-card card-shadow p-4">
            <h4>Read & Agree to Terms & Conditions</h4>
            <p>Please read carefully the details of the event you are going to register:- </p>
            <div className="mt-4 terms-scroller" dangerouslySetInnerHTML={{ __html: content}} />
            <div className="terms-text">
                <input type="checkbox" name="i-agree" onChange={(e) => setVal(e.target.value)}/>
                By proceeding further with my registration, I agree to the above terms of the event and the general <Link href="/coc"><a>code of conduct</a></Link> of Vidyut 2020.
            </div>
            <button className="btn btn-warning px-4 py-2 font-weight-bold m-2" onClick={() => onClickBack()}>Go Back</button>
            { val ? <button className="btn btn-primary px-4 py-2 font-weight-bold m-2" onClick={() => onAgree()}>Agree & Proceed</button> : null }
        </div>
    )
};

export default UserAgreement;