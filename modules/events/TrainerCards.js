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
        <div onClick={() => handleOpen(i)} className="trainer-profile-card">
            <div className="d-block d-md-none">
                <div className="card-shadow d-inline-flex h-100 my-2">
                    { trainer.photo ? <img src={trainer.photo} style={{ width: "35%" }}/> : null }
                    <div className="p-2 d-flex align-items-center text-left">
                        <div>
                            <h5 className="font-weight-bold mb-1">{trainer.name}</h5>
                            {
                                trainer.about ?
                                    <button className="btn-shadow small-text btn btn-primary rounded-0 mb-2 px-4 py-2">About</button>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-none d-md-block">
                <div className="card-shadow h-100 my-2">
                    { trainer.photo ? <img src={trainer.photo}/> : null }
                    <div className="p-2 text-center">
                        <h5 className="font-weight-bold mb-2">{trainer.name}</h5>
                        {
                            trainer.about ?
                                <button className="btn-shadow btn btn-primary small-text rounded-0 mx-2 mb-2 px-4 py-2">About</button>
                                : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );

    return trainers && trainers.length > 0 ?
        <div className="card-shadow p-3 bg-gradient rounded my-4">
            <h4 className="px-4 mt-4 mb-2">
                <img
                    src={require('../../images/icons/trainer-icon.png')}
                    style={{ width: "2rem", filter: "contrast(0.1) brightness(5)" }}
                    className="m-2"
                />
                Trainers
            </h4>
            <div className="row m-0">
                {
                    trainers.length > 1 ?
                        trainers.map((trainer,i) => <div className="col-md-4 p-2">
                            {renderTrainerCard(trainer, i)}
                        </div>) : trainers.map((trainer,i) => <div className="col-md-6">
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
                            <div
                                style={{ maxHeight: "75vh" }}
                                className="card-shadow"
                            >
                                <div className="row m-0">
                                   <div className="col-md-4 px-0">
                                       <div className="d-none d-md-block bg-gradient p-3">
                                           <h4 className="m-0 pb-2">{selectedTrainer.name}</h4>
                                           { selectedTrainer.photo ?
                                               <img
                                                    src={selectedTrainer.photo}
                                                    alt={`Photo of ${selectedTrainer.name}`}
                                               />
                                               : null
                                           }
                                       </div>
                                      <div className="d-inline-flex d-md-none align-items-center bg-gradient p-3">
                                          { selectedTrainer.photo ?
                                              <img
                                                  src={selectedTrainer.photo}
                                                  style={{ width: "30%" }}
                                                  alt={`Photo of ${selectedTrainer.name}`}
                                              />
                                              : null
                                          }
                                          <h4 className="m-0 pl-2">{selectedTrainer.name}</h4>
                                      </div>
                                    </div>
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