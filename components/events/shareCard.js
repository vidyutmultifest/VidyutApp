import React from "react";
import {
    FacebookShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    TwitterShareButton
} from 'react-share';

const ShareCard = ({ title, link }) => (
     <div id="share-card" className="card-shadow rounded w-100">
         <h5 className="m-0 px-4 text-left pt-4 ">
             <img src={require('../../images/icons/speaker-icon.png')} style={{ width: "2rem" }} className="icon-img m-2" />
             Spread the Word
         </h5>
         <div className="share-items row w-100 mx-0 p-4 mb-4">
             <div className="col-3 p-0">
                 <WhatsappShareButton
                    url={link}
                    title={`Hey! Did you checkout ${title} at Vidyut 2020?`}
                 >
                     <img src={require('../../images/icons/whatsapp.png')} />
                 </WhatsappShareButton>
             </div>
             <div className="col-3 p-0">
                 <FacebookShareButton
                    url={link}
                    qoute={`Checkout ${title} at Vidyut 2020, Multifest at Amrita Vishwa Vidyapeetham, Amritapuri Campus.`}
                    hashtag="#Amrita#Vidyut2020"
                 >
                     <img src={require('../../images/icons/facebook.png')} />
                 </FacebookShareButton>
             </div>
             <div className="col-3 p-0">
                 <TelegramShareButton
                     url={link}
                     title={`Hey! Did you checkout ${title} at Vidyut 2020?`}
                 >
                     <img src={require('../../images/icons/telegram.png')} />
                 </TelegramShareButton>
             </div>
             <div className="col-3 p-0">
                 <TwitterShareButton
                    url={link}
                 >
                     <img src={require('../../images/icons/twitter.png')} />
                 </TwitterShareButton>
             </div>
         </div>
     </div>
);

export default ShareCard;