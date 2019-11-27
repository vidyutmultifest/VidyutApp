import React from "react";

const ShareCard = ({ title, photo, text, offer, link }) => (
     <div className="card-shadow">
         <div className="row m-0">
             <div className="col-md-6">
                 <div className="share-prompt">Like this event? Share it with your friends!!</div>
             </div>
             <div className="col-md-6">
                 <div className="share-buttons">
                     <a href="https://facebook.com/">Fb</a>
                 </div>
             </div>
         </div>
     </div>
);

export default ShareCard;