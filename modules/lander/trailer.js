import React, {useState} from "react";
import '../../styles/lander/trailer.sass';
import Modal from 'react-modal';

const LanderTrailer = () => {
    const [isOpen, setOpen] = useState(false);

    return (
        <section id="lander-trailer" className="d-flex align-items-center justify-content-center">
            <div className="animated jackInTheBox video-thumbnail">
                <div className="wrapper d-flex align-items-center" onClick={() => setOpen(true)}>
                    <div className="text-center w-100">
                        <img src={require('../../images/icons/play-button.png')} />
                        <h4>Vidyut 2019 - Throwback Video</h4>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setOpen(false)}
                className="trailer-modal"
                overlayClassName="qr-overlay trailer-overlay"
            >
                <iframe
                    src="https://www.youtube.com/embed/x_mRHkIPmAs"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </Modal>
        </section>
    );

};
export default LanderTrailer;