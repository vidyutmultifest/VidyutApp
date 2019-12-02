import React, {useEffect, useState} from "react";
import dataFetch from "../../utils/dataFetch";

import Base from "../../components/base";
import TitleBar from "../../components/titleBar";
import DashboardFooter from "../../modules/dashboard/footer";
import Webcam from "react-webcam";
import fileUpload from "../../utils/fileUpload";
import Boundingbox from "react-bounding-box";

const UploadCollegeID = () => {
    const [isQueried, setQueried] = useState(false);
    const [isProfileLoaded, setProfileLoaded] = useState(false);
    const [profileData, setProfileData] = useState();
    const [isClicked, setClicked] = useState();
    const [photo, setPhoto] = useState();
    const [recData, setRecData] = useState(false);
    const [box, setBox] = useState(false);


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
        isAmritapurian
        college
        {
            name
            location
        }
      }
    }`;

    const getProfile = async () => await dataFetch({ query });

    useEffect(() => {
        if(!isQueried)
        {
            getProfile().then(  response => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setProfileData(response.data);
                    setProfileLoaded(true);
                }
            })
        }
    });

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
            getBox(file,data).then((response) => { setBox(response); });
            setRecData(data);
        });
    };

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
            const data = a.Geometry.BoundingBox;
            const x = data.Left * w;
            const y = data.Top * h;
            const width = data.Width * w;
            const height = data.Height * h;
            arr.push([x, y, width, height]);
        });
        return arr;
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

    const renderWebcam = (
        <div>
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
            <div className="text-center">
                <button className="btn btn-primary" onClick={capture}>Capture photo</button>
            </div>
        </div>
    );

    return <Base loginRequired>
        <TitleBar />
        <div className="container my-4 ">
            <div className="card-shadow p-4">
                <h3>Update Profile</h3>
                {
                    !isClicked ? renderWebcam : (
                        <div>
                            { photo ? <Boundingbox image={photo} boxes={box} /> : null }
                            <form>
                                <div className="form-group">
                                    <label htmlFor="rollNo">Roll No.</label>
                                    <input name="rollNo" className="form-control"/>
                                </div>
                            </form>
                        </div>
                    )
                }
            </div>
        </div>
        <DashboardFooter />
    </Base>

};
export default UploadCollegeID;