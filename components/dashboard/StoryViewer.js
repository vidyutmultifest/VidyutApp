import React, {useState} from "react";
import Modal from "react-modal";
import '../../styles/dashboard/stories-viewer.sass';
import  NoSSR from '../../components/noSSR';

let Stories;
if (typeof window !== 'undefined') {
    Stories = require('react-insta-stories')
}

const StoryViewer = ({ feeds }) => {
    const [isOpen, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const handleStoryOpen = (i) => {
        setIndex(i);
        setOpen(true);
    };

    return (
        <div className="stories-container card-shadow p-2">
            <div className="stories-viewer">
                {
                    feeds.map((f,i)=> f.stories.length > 0 ? (
                            <div
                                onClick={() => handleStoryOpen(i)}
                            >
                                <img src={f.stories[0].url} />
                             </div>
                        ) : null
                    )
                }
                <Modal
                    isOpen={isOpen}
                    contentLabel="My Vidyut QR"
                    onRequestClose={() => setOpen(false)}
                    className="card-shadow"
                    overlayClassName="qr-overlay story-overlay"
                >
                    <NoSSR>
                        {
                            typeof document !== 'undefined' ?
                                <Stories
                                    stories={feeds[index].stories}
                                    defaultInterval={1500}
                                /> : null
                        }
                    </NoSSR>
                </Modal>
            </div>
        </div>
    )
};

export default StoryViewer;