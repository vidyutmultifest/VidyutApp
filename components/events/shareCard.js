import React from "react";
import {
    FacebookShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    TwitterShareButton
} from 'react-share';

const ShareCard = ({ title, link }) => (
     <div id="share-card" className="card-shadow">
         <div className="p-4 my-4">
             <div className="d-flex">
                 <WhatsappShareButton
                    url={link}
                    title={`Hey! Did you checkout ${title} at Vidyut 2020?`}
                 >
                     <img src={require('../../images/icons/whatsapp.png')} />
                 </WhatsappShareButton>
                 <FacebookShareButton
                    url={link}
                    qoute={`Checkout ${title} at Vidyut 2020, Multifest at Amrita Vishwa Vidyapeetham, Amritapuri Campus.`}
                    hashtag="#Amrita#Vidyut2020"
                 >
                     <img src={require('../../images/icons/facebook.png')} />
                 </FacebookShareButton>
                 <TelegramShareButton
                     url={link}
                     title={`Hey! Did you checkout ${title} at Vidyut 2020?`}
                 >
                     <img src={require('../../images/icons/telegram.png')} />
                 </TelegramShareButton>
                 <LinkedinShareButton
                    url={link}
                 >
                     <img src={require('../../images/icons/linkedin.png')} />
                 </LinkedinShareButton>
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