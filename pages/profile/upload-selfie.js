import React, {useState} from "react";

import Base from "../../components/base";
import TitleBar from "../../components/titleBar";
import Footer from "../../modules/dashboard/footer";
import Webcam from "react-webcam";
import fileUpload from "../../utils/fileUpload";
import Boundingbox from "react-bounding-box";

import '../../styles/profile/selfie.sass';
import '../../styles/style.sass';
import LoadingScreen from "../../components/loadingScreen";
import Link from "next/link";
import Head from "next/head";

const UploadSelfie = () => {
    const [isUploading, setUploading] = useState(false);
    const [isUploaded, setUploaded] = useState(false);
    const [isClicked, setClicked] = useState(false);
    const [photoBS4, setPhoto] = useState();
    const [box, setBox] = useState(false);
    const [recData, setRecData] = useState(false);

    const dataURItoBlob = (dataURI) => {
        let byteString = atob(dataURI.split(',')[1]);
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        let bb = new Blob([ab]);
        return  new File([bb], "selfie.jpg");
    };

    const uploadFile = async data => await fileUpload(data);

    const handleImageUpload = (file) => {
        const data = new FormData();
        const mutation = `mutation updateProfile{
          updateProfile
          {
            status
          }
        }`;
        data.append('profilePhoto', file);
        data.append('query', mutation);
        setUploading(true);
        uploadFile({data}).then((response) => {
            setUploading(false);
            setUploaded(true);
        });
    };

    const sendToAmazon = (file) => {
        const data = new FormData();
        const query = `{
          detectFace
          {
            jsonData
          }
        }`;
        data.append('photo', dataURItoBlob(file));
        data.append('query', query);
        uploadFile({data}).then((response) => {
            const data = JSON.parse(response.data.detectFace.jsonData.replace(/\'/g, '"')).FaceDetails;
            getBox(file,data).then((response) => { setBox(response); });
            setRecData(data);
        });
    };

    const webcamRef = React.useRef(null);

    const onUpload = () => {
        const imageSrc = dataURItoBlob(photoBS4);
        handleImageUpload(imageSrc);
    };

    const capture = React.useCallback(
        () => {
            const imagebs64 = webcamRef.current.getScreenshot();
            sendToAmazon(imagebs64);
            setPhoto(imagebs64);
            setClicked(true);
        },
        [webcamRef]
    );

    const getSize = (photo) => {
        return new Promise (function (resolved, rejected) {
            let i = new Image();
            i.onload = function(){
                resolved({w: i.width, h: i.height})
            };
            i.src = photo
        })
    };

    const getBox = async (photo, response) => {
        if(response.length === 0)
            return null;
        let arr  = [];
        const img = await getSize(photo);
        const h = img.h;
        const w = img.w;
        response.map(a => {
            const data = a.BoundingBox;
            const x = data.Left * w;
            const y = data.Top * h;
            const width = data.Width * w;
            const height = data.Height * h;
            arr.push([x, y, width, height]);
        });
        return arr;
    };

    const renderOnSuccess = (
        <div className="p-4 m-2 card-shadow">
            <h4>Profile picture successfully updated</h4>
            <Link href="/dashboard">
                <button className="btn btn-primary px-4 py-2">Go to Dashboard</button>
            </Link>
        </div>
    );

    const renderWebcam = (
        <div>
            <Webcam
                audio={false}
                mirrored={true}
                style={{ maxWidth: "100%"}}
                videoConstraints={{facingMode: "user"}}
                ref={webcamRef}
                minScreenshotHeight="75vh"
                screenshotFormat="image/jpeg"
                screenshotQuality="0.92"
            />
            <div className="text-center">
                <button className="btn btn-primary py-4 px-4" onClick={capture}>Capture Selfie</button>
            </div>
        </div>
    );

    return <Base loginRequired>
        <Head>
            <title>Upload Selfie | Profile Updation | Vidyut 2020</title>
        </Head>
        { isClicked && !recData ?
            <LoadingScreen text="Validating your photo with Face Detection Engine." />
        : isUploading ?
            <LoadingScreen text="Uploading Photo" />
         : <React.Fragment>
        <TitleBar />
            <div id="update-selfie-page" className="container my-4">
                <h3>Upload Selfie</h3>
                <div className="alert alert-info my-2 p-2">
                    Make sure you have enabled camera access for this website.
                </div>
                <div className="selfie-card card-shadow text-center">
                    { isUploaded ?
                        renderOnSuccess
                        : !isClicked ? renderWebcam : <div>
                            <div>
                                {
                                    photoBS4 && getBox ? <Boundingbox
                                        image={photoBS4}
                                        boxes={box} /> : null
                                }
                            </div>
                            <div className="text-center">
                                <div className="card-shadow p-2 m-2">
                                    {
                                        recData ?
                                            recData.length === 1 && recData[0].Quality.Brightness < 50 && recData[0].Quality.Sharpness < 40 ?
                                                    "We have detected a face in this photo. However, this photo seems to be unclear or/and too dim. Please try again."
                                                : recData.length === 1 ?
                                                "We have detected a face in this photo. If this photo still hides or manipulates your face, we reserve the right to deny entry to you."
                                                    : recData.length === 0 ?
                                                    "We have not detected any face in this photo. Please try again"
                                                        : "We have recognized more than one face in this photo. Please try again"
                                                : null
                                    }
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-primary px-4 py-4 m-2" onClick={() => { setClicked(false); setRecData(false); }}>Retake Selfie</button>
                                    {
                                        recData !== false && recData.length === 1 && recData[0].Quality.Brightness > 50 && recData[0].Quality.Sharpness > 40 ?
                                            <button className="btn btn-primary px-4 py-4 m-2" onClick={onUpload}>Upload Selfie</button> : null
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        <Footer />
        </React.Fragment>
        }
    </Base>
};

export default UploadSelfie;