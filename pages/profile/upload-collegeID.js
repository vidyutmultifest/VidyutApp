import React, {useEffect, useState} from "react";
import dataFetch from "../../utils/dataFetch";

import Base from "../../components/base";
import TitleBar from "../../components/titleBar";
import DashboardFooter from "../../modules/dashboard/footer";
import Webcam from "react-webcam";
import fileUpload from "../../utils/fileUpload";
import Boundingbox from "react-bounding-box";
import LoadingScreen from "../../components/loadingScreen";
import Head from "next/head";
const _ = require('lodash');

const UploadCollegeID = () => {
    const [isSubmitting, setSubmission] = useState(false);
    const [isQueried, setQueried] = useState(false);
    const [isProfileLoaded, setProfileLoaded] = useState(false);
    const [profileData, setProfileData] = useState();
    const [isClicked, setClicked] = useState(false);
    const [photo, setPhoto] = useState();
    const [box, setBox] = useState(false);
    const [rollNo, setRollNo] = useState('');

    const dataURItoBlob = (dataURI) => {
        let byteString = atob(dataURI.split(',')[1]);
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        let bb = new Blob([ab]);
        return  new File([bb], "collegeID.jpg");
    };

    const uploadFile = async data => await fileUpload(data);

    const query = `{
      myProfile
      {
        isAmritian
        rollNo
        isAmritapurian
        college
        {
            name
            location
        }
      }
    }`;

    const getProfile = async () => await dataFetch({ query });

    const fetchProfileDetails = () => {
        getProfile().then(  response => {
            setQueried(true);
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                setProfileData(response.data.myProfile);
                setProfileLoaded(true);
            }
        });
    };

    useEffect(() => { if(!isQueried) fetchProfileDetails() });

    let updateRollNoQuery = `mutation updateProfile($details: ProfileDetailsObj){
      updateProfile(details: $details)
      {
        status
      }
    }`;

    const updateRollNo = async variables => await dataFetch({ query: updateRollNoQuery, variables });

    const submitRollNoUpdate = () => {
        const variables = {
            "details": {
                "rollNo": rollNo
            }
        };
        setSubmission(true);
        updateRollNo(variables).then((response) => {
            const data = new FormData();
            data.append('profileCollegeID', dataURItoBlob(photo));
            const query = `mutation updateProfile{
                  updateProfile
                  {
                    status
                  }
                }`;
            data.append('query', query);
            uploadFile({data}).then((response) => {
                setQueried(false);
                setSubmission(false);
            });
        });

    };

    const sendToAmazon = (file) => {
        const data = new FormData();
        const query = `{
          detectText
          {
            jsonData
          }
        }`;
        data.append('photo', dataURItoBlob(file));
        data.append('query', query);
        uploadFile({data}).then((response) => {
            const data = JSON.parse(response.data.detectText.jsonData.replace(/\'/g, '"')).TextDetections;
            const processed = processTextData(data);
            if(processed && processed.Geometry)
                getBox(file, processed).then((response) => {
                    setBox(response);
                });

        });
    };

    const getSize = (photo) => {
        return new Promise (function (resolved, rejected) {
            let i = new Image();
            i.onload = function(){ resolved({w: i.width, h: i.height}) };
            i.src = photo
        })
    };

    const processTextData = data => {
        const parents = data.filter(a => a.ParentId === undefined);
        const acceptedValues = ['AM'];
        const supplymentary = ['BT', 'EN', 'AR', 'ENG', 'CSE', 'AIE', 'HS'];
        const nums = ['1','2','3','4','5','6','8','9','0'];
        const rejected = ['AMRITA', 'ENGI', 'AMR'];
        const filtered = parents.filter(p => _.some(acceptedValues, (el) => _.includes(p.DetectedText.toUpperCase(), el)));
        const f1 = filtered.filter(p => _.some(supplymentary, (el) => _.includes(p.DetectedText.toUpperCase(), el)));
        const f2 = f1.filter(p => _.some(nums, (el) => _.includes(p.DetectedText.toUpperCase(), el)));
        const f3 = f2.filter(p => _.some(rejected, (el) => !_.includes(p.DetectedText.toUpperCase(), el)));
        console.log(f3);
        if(f3.length!==0)
        {
            setRollNo(f3[0].DetectedText);
            return f3[0];
        }
        return null;
    };

    const getBox = async (photo, a) => {
        const img = await getSize(photo);
        const h = img.h;
        const w = img.w;
        const data = a.Geometry.BoundingBox;
        const x = data.Left * w;
        const y = data.Top * h;
        const width = data.Width * w;
        const height = data.Height * h;
        return [x, y, width, height];
    };

    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        () => {
            const imagebs64 = webcamRef.current.getScreenshot();
            sendToAmazon(imagebs64);
            setPhoto(imagebs64);
            setClicked(true);
        },
        [webcamRef]
    );

    const getRollNo = () => {
        let rn = '';
        if(!isClicked) rn = profileData.rollNo;
        else rn = rollNo;
        return rn;
    };


    const renderWebcam = (
        <Webcam
            audio={false}
            mirrored={false}
            style={{ maxWidth: "100%"}}
            videoConstraints={{facingMode: "environment"}}
            ref={webcamRef}
            minScreenshotHeight="75vh"
            screenshotFormat="image/jpeg"
            screenshotQuality="0.92"
        />
    );

    return <Base loginRequired>
        <Head>
            <title>Upload CollegeID | Profile Updation | Vidyut 2020</title>
        </Head>
        {
            isSubmitting ?
                <LoadingScreen text="Saving changes" />
                : !isProfileLoaded ? <LoadingScreen text="Loading your profile" /> : (
                <React.Fragment>
                    <TitleBar />
                    <div className="container my-4 ">
                        <div className="card-shadow p-4">
                            <div className="row m-0">
                                <div className="col-12"><h3>Update College Profile</h3></div>
                                <div className="col-md-4 p-2">
                                    {
                                        isClicked ?
                                        <Boundingbox
                                            image={photo}
                                            boxes={[box]}
                                        /> : renderWebcam
                                    }
                                    <div className="text-center">
                                        {
                                            isClicked ?
                                                <button className="btn btn-primary" onClick={() => { setClicked(false); }}>Retry</button>
                                                : <button className="btn btn-primary" onClick={capture}>Capture photo</button>
                                        }
                                    </div>
                                </div>
                                <div className="col p-2">
                                    {
                                        profileData.isAmritapurian ? (
                                            <div>
                                                <div className="form-group">
                                                    <label htmlFor="rollNo">Roll No.</label>
                                                    <input
                                                        name="rollNo"
                                                        value={getRollNo()}
                                                        onChange={(e) => setRollNo(e.target.value)}
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        ) : null
                                    }
                                </div>
                                <div className="col-12 m-0">
                                    <button className="btn btn-primary" onClick={submitRollNoUpdate}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DashboardFooter />
                </React.Fragment>
            )
        }

    </Base>

};
export default UploadCollegeID;