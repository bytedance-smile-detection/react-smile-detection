import React, { useState, useEffect, useContext, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as faceapi from "@vladmandic/face-api";
import { Image } from "antd-mobile";
import "./index.css";
import { ModelContext } from "../../components/Nav";
import { WIDTH, HEIGHT, FACE_MODEL_URL } from "../../constants";

const Camera = () => {
  const model = useContext(ModelContext);
  const [result, setResult] = useState([]);
  const cameraRef = useRef(null);
  const snapshotRef = useRef(null);
  const faceRef = useRef(null);

  const tinyFaceDetector = new faceapi.TinyFaceDetectorOptions();
  let videoTracks;
  useEffect(() => {
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

    const timer = setInterval(getFace, 300);

    return () => {
      clearInterval(timer);
      videoTracks[0].stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFace = async () => {
    await takeSnapshot();
    const face = await faceapi.detectSingleFace(
      snapshotRef.current,
      tinyFaceDetector
    );
    if (face?.box) {
      const box = {
        top: face.box.top,
        right: face.box.right,
        bottom: face.box.bottom,
        left: face.box.left,
      };

      console.log(box);

      await drawFaceCanvas(box);
      detect();
    } else {
      console.log("未检测到人脸!");
      setResult(null);
    }
  };

  const takeSnapshot = async () => {
    snapshotRef.current.width = cameraRef.current.videoWidth;
    snapshotRef.current.height = cameraRef.current.videoHeight;

    await snapshotRef.current
      .getContext("2d")
      .drawImage(
        cameraRef.current,
        0,
        0,
        snapshotRef.current.width,
        snapshotRef.current.height
      );
  };

  const drawFaceCanvas = async (box) => {
    faceRef.current.width = box.right - box.left;
    faceRef.current.height = box.bottom - box.top;

    await faceRef.current
      .getContext("2d")
      .drawImage(
        snapshotRef.current,
        box.left,
        box.top,
        faceRef.current.width,
        faceRef.current.height,
        0,
        0,
        faceRef.current.width,
        faceRef.current.height
      );
  };

  const detect = async () => {
    let element = faceRef.current;
    let tensor = tf.browser.fromPixels(element);

    const resized = tf.image.resizeBilinear(tensor, [WIDTH, HEIGHT]);
    const batched = resized
      .mean(2)
      .expandDims(0)
      .reshape([-1, WIDTH, HEIGHT, 1]);
    const normalized = batched.toFloat().div(255.0);

    const prediction = await model.predict(normalized).data();
    const res = Array.from(prediction);

    console.log(res);
    setResult(res);
  };

  return (
    <>
      <video
        id="camera"
        ref={cameraRef}
        className="object-cover h-screen"
        autoPlay
        playsInline
      ></video>
      {/* <Button onClick={getFace}>截取视频</Button> */}
      {result ? (
        result[1] >= 0.7 ? (
          <span className="flex items-center fixed bottom-24 px-5 py-3 right-1/2 translate-x-1/2 bg-white rounded-3xl font-bold">
            <Image
              className="mr-2"
              src={require(`../../assets/smiling.png`)}
              width={24}
              height={24}
            />
            Smiling
          </span>
        ) : (
          <span className="flex items-center fixed bottom-24 px-5 py-3 right-1/2 translate-x-1/2 bg-white rounded-3xl font-bold">
            <Image
              className="mr-2"
              src={require(`../../assets/notSmiling.png`)}
              width={24}
              height={24}
            />
            Not Smiling
          </span>
        )
      ) : (
        <span className="flex items-center fixed bottom-24 px-5 py-3 right-1/2 translate-x-1/2 bg-white rounded-3xl font-bold">
          <Image
            className="mr-2"
            src={require(`../../assets/no-face.png`)}
            width={24}
            height={24}
          />
          No Face Detected
        </span>
      )}
      <canvas ref={snapshotRef} className="w-full hidden"></canvas>
      <canvas ref={faceRef} className="w-full hidden"></canvas>
    </>
  );
};

export default Camera;
