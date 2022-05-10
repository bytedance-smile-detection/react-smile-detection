import React, { useState, useEffect, useContext, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as faceapi from "@vladmandic/face-api";
import { Radio, Space, Popup, Image, Button, Toast } from "antd-mobile";
import SvgIcon from "../../components/SvgIcon";
import Judgment from "../Judgment";
import { ModelContext } from "../../index";
import "./index.css";
import { WIDTH, HEIGHT, FACE_MODEL_URL } from "../../constants";
import { base64ToFile, uploadImage } from "../../utils";

const Automatic = () => {
  const lenetModel = useContext(ModelContext);
  const [result, setResult] = useState([]);
  const [speed, setSpeed] = useState(700);
  const [threshold, setThreshold] = useState(0.5);
  const [isSpeedPopupShow, setIsSpeedPopupShow] = useState(false);
  const [isThresHoldPopupShow, setIsThresHoldPopupShow] = useState(false);
  const [isPopupShow, setIsPopupShow] = useState(false);
  const [imageSrc, setimageSrc] = useState("");
  const cameraRef = useRef(null);
  const snapshotRef = useRef(null);
  const faceRef = useRef(null);

  const tinyFaceDetector = new faceapi.TinyFaceDetectorOptions();
  let timer = null;
  let judgment = <Judgment icon="no-face" text="No Face Detected" />;

  useEffect(() => {
    let videoTracks = null;

    const getUserMedia = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri(FACE_MODEL_URL);
      const constraints = {
        audio: false,
        video: true,
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoTracks = stream.getVideoTracks();

        cameraRef.current.srcObject = stream;
        console.log(`正在使用的设备：${videoTracks[0].label}`);
      } catch (err) {
        console.log(err);
      }
    };

    getUserMedia();

    return () => {
      clearInterval(timer);
      timer = null;
      videoTracks[0].stop();
    };
  }, []);

  useEffect(() => {
    timer = setInterval(takeSnapshot, speed);

    return () => {
      clearInterval(timer);
      timer = null;
    };
  }, [speed]);

  const takeSnapshot = async () => {
    snapshotRef.current.width = cameraRef.current.videoWidth;
    snapshotRef.current.height = cameraRef.current.videoHeight;

    await snapshotRef.current.getContext("2d").drawImage(cameraRef.current, 0, 0, snapshotRef.current.width, snapshotRef.current.height);

    const face = await faceapi.detectSingleFace(snapshotRef.current, tinyFaceDetector);
    const imageSrc = snapshotRef.current.toDataURL("image/jpg");
    setimageSrc(imageSrc);

    if (face?.box) {
      const { box } = face;
      const faceRefCurrent = await drawFaceCanvas(snapshotRef.current, box);
      const isFaceDetected = await detect(faceRefCurrent);

      if (isFaceDetected) {
        clearInterval(timer);
        timer = null;
        setIsPopupShow(true);
      } else {
        judgment = <Judgment icon="not-smiling" text="Not Smiling" />;
      }
    } else {
      judgment = <Judgment icon="no-face" text="No Face Detected" />;
    }
  };

  const drawFaceCanvas = async (snapshot, box) => {
    faceRef.current.width = box.right - box.left;
    faceRef.current.height = box.bottom - box.top;

    await faceRef.current.getContext("2d").drawImage(snapshot, box.left, box.top, faceRef.current.width, faceRef.current.height, 0, 0, faceRef.current.width, faceRef.current.height);

    return faceRef.current;
  };

  const detect = async (face) => {
    let tensor = tf.browser.fromPixels(face);

    const resized = tf.image.resizeBilinear(tensor, [WIDTH, HEIGHT]);
    const batched = resized.mean(2).expandDims(0).reshape([-1, WIDTH, HEIGHT, 1]);
    const normalized = batched.toFloat().div(255.0);

    const prediction = await lenetModel.predict(normalized).data();
    const res = Array.from(prediction);

    console.log(res);
    setResult(res);

    return res[1] > threshold;
  };

  const closePopup = () => {
    timer = setInterval(takeSnapshot, speed);
    setIsPopupShow(false);
  };

  const saveImage = async () => {
    try {
      const file = base64ToFile(imageSrc);
      const res = await uploadImage(file);
      console.log(res);

      if (res.code === 201) {
        Toast.show({ content: "Saved successfully" });
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      console.log("图片上传失败", error.message);
      Toast.show({ content: "Failed to save, please try again" });
    }
  };

  return (
    <>
      <video id="camera" ref={cameraRef} className="w-full" autoPlay playsInline></video>
      <div className="automatic-bottom-area flex justify-around py-2 bg-gray-100">
        <Button className="setting-button font-semibold" onClick={() => setIsSpeedPopupShow(true)}>
          {speed === 1000 ? "Speed: Slow" : speed === 700 ? "Speed: Medium" : "Speed: Fast"}
        </Button>
        <Button className="setting-button font-semibold" onClick={() => setIsThresHoldPopupShow(true)}>
          {threshold === 0.3 ? "Threshold: Slow" : threshold === 0.5 ? "Threshold: Medium" : "Threshold: High"}
        </Button>
      </div>

      {judgment}
      <canvas ref={snapshotRef} className="w-full hidden"></canvas>
      <canvas ref={faceRef} className="w-full hidden"></canvas>

      <Popup
        visible={isSpeedPopupShow}
        onMaskClick={() => {
          setIsSpeedPopupShow(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "1.5rem",
          borderTopRightRadius: "1.5rem",
          padding: "2.25rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Radio.Group
          value={speed}
          onChange={(value) => {
            setSpeed(value);
          }}
        >
          <Space justify="between">
            <Radio className="radio" value={1000}>
              Low
            </Radio>
            <Radio className="radio" value={700}>
              Medium
            </Radio>
            <Radio className="radio" value={300}>
              Fast
            </Radio>
          </Space>
        </Radio.Group>

        <div className="popup-button mt-10">
          <Button className="popup-confirm-button font-semibold" block onClick={() => setIsSpeedPopupShow(false)}>
            Confirm
          </Button>
        </div>
      </Popup>

      <Popup
        visible={isThresHoldPopupShow}
        onMaskClick={() => {
          setIsThresHoldPopupShow(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "1.5rem",
          borderTopRightRadius: "1.5rem",
          padding: "2.25rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Radio.Group
          value={threshold}
          onChange={(value) => {
            setThreshold(value);
          }}
        >
          <Space justify="between">
            <Radio className="radio" value={0.3}>
              Low
            </Radio>
            <Radio className="radio" value={0.5}>
              Medium
            </Radio>
            <Radio className="radio" value={0.7}>
              High
            </Radio>
          </Space>
        </Radio.Group>

        <div className="popup-button mt-10">
          <Button className="popup-confirm-button font-semibold" block onClick={() => setIsThresHoldPopupShow(false)}>
            Confirm
          </Button>
        </div>
      </Popup>

      <Popup
        visible={isPopupShow}
        onMaskClick={() => {
          setIsPopupShow(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "1.5rem",
          borderTopRightRadius: "1.5rem",
          padding: "2.25rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Image className="rounded-3xl mb-6" src={imageSrc} />

        <div className="flex justify-between mb-6 normal-text-color text-lg">
          <span className="flex items-center">
            <SvgIcon className="mr-2" name="smiling" width={24} height={24} />
            <p className="ml-2">Smiling</p>
          </span>
          <span>{`${(result[1] * 100).toFixed(4)}%`}</span>
        </div>
        <div className="flex justify-between normal-text-color text-lg">
          <span className="flex items-center">
            <SvgIcon name="not-smiling" width={24} height={24} />
            <p className="ml-2">Not Smiling</p>
          </span>
          <span>{`${(result[0] * 100).toFixed(4)}%`}</span>
        </div>

        <div className="popup-button">
          <div className="flex justify-between items-center mt-10">
            <Button className="back-button font-semibold" onClick={closePopup} fill="outline">
              Back
            </Button>
            <Button className="save-button font-semibold" onClick={saveImage}>
              Save
            </Button>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default Automatic;
