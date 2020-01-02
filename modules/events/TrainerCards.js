import React, {useState} from "react";
import Modal from "react-modal";

const TrainerCards = ({ trainers }) => {
    const [isOpen, setOpen] = useState(false);
    const [selectedTrainer, setSelected] = useState(false);

    const handleOpen = (i) => {
        setSelected(trainers[i]);
        setOpen(true);
    };

    return trainers && trainers.length > 0 ?
        <div className="my-4">
            <h2 className="px-4 mt-4 mb-2">Trainers</h2>
            <div className="row m-0">
                { trainers.map((trainer,i) => (
                        <div onClick={() => handleOpen(i)} className="trainer-profile-card col-6 col-md-4 p-2">
                            <div className="card-shadow h-100 my-2">
                                { trainer.photo ? <img src={trainer.photo}/> : null }
                                <div className="p-4">
                                    <h4>{trainer.name}</h4>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <Modal
                    isOpen={isOpen}
                    contentLabel="Trainer Profile"
                    onRequestClose={() => setOpen(false)}
                    className="trainer-popup"
                    overlayClassName="trainer-popup-overlay"
                >
                {
                    isOpen && selectedTrainer ?
                        (
                            <div className="card-shadow p-3">
                                <div className="row m-0">
                                    {
                                        selectedTrainer.photo ?
                                            <div className="col-md-4 p-2 d-flex align-items-center">
                                                <img src={selectedTrainer.photo}/>
                                            </div> : null
                                    }
                                    <div className="col-md-8 p-2">
                                        <div className="mb-3">
                                            <h4>{selectedTrainer.name}</h4>
                                        </div>
                                        {
                                            selectedTrainer.about ?
                                                <div dangerouslySetInnerHTML={{ __html: selectedTrainer.about}} />
                                                : <div>No details about this trainer at the moment.</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        ) : null
                }
                </Modal>
            </div>
        </div> : null
};

export default TrainerCards;