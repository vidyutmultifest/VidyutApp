import React, {useState} from "react";
import Modal from "react-modal";

const TrainerCards = ({ trainers }) => {
    const [isOpen, setOpen] = useState(false);
    const [selectedTrainer, setSelected] = useState(false);

    const handleOpen = (i) => {
        setSelected(trainers[i]);
        setOpen(true);
    };

    const renderTrainerCard = (trainer, i) => (
        <div onClick={() => handleOpen(i)} className="trainer-profile-card p-2">
            <div className="card-shadow h-100 my-2">
                { trainer.photo ? <img src={trainer.photo}/> : null }
                <div className="px-2 text-center py-4">
                    <h5 className="font-weight-bold">{trainer.name}</h5>
                    <button className="btn btn-primary mx-2 mt-2 px-4 py-2">About</button>
                </div>
            </div>
        </div>
    );

    return trainers && trainers.length > 0 ?
        <div className="card-shadow p-3 bg-gradient rounded my-4">
            <h4 className="px-4 mt-4 mb-2">
                <img src={require('../../images/icons/trainer-icon.png')} style={{ width: "2rem" }} className="icon-img m-2" />
                Trainers
            </h4>
            <div className="row m-0">
                {
                    trainers.length > 1 ?
                        trainers.map((trainer,i) => <div className="col-6 col-md-4">
                            {renderTrainerCard(trainer, i)}
                        </div>) : trainers.map((trainer,i) => <div className="col-12 col-md-6">
                            {renderTrainerCard(trainer, i)}
                        </div>)

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
                                <h4>About Trainer</h4>
                                <div className="row m-0">
                                    {
                                        selectedTrainer.photo ?
                                            <div className="col-md-4 p-2">
                                                    <img src={selectedTrainer.photo}/>
                                                    <h4 className="m-0 pt-2">{selectedTrainer.name}</h4>
                                            </div> : null
                                    }
                                    <div className="col-md-8 p-2">
                                        {
                                            selectedTrainer.about ?
                                                <div className="trainer-about p-2" dangerouslySetInnerHTML={{ __html: selectedTrainer.about}} />
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