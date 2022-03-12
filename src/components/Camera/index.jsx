import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import * as faceapi from "@vladmandic/face-api";
import Judgment from "../Judgment";
import "./index.css";
import { ModelContext } from "../../components/Nav";
import { WIDTH, HEIGHT, FACE_MODEL_URL } from "../../constants";

const Camera = () => {
  const navigate = useNavigate();
  const model = useContext(ModelContext);
  const [result, setResult] = useState([]);
  const cameraRef = useRef(null);
  const snapshotRef = useRef(null);
  const faceRef = useRef(null);

  const tinyFaceDetector = new faceapi.TinyFaceDetectorOptions();
  const threshold = 0.7;

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

    const timer = setInterval(getFace, 300);

    return () => {
      clearInterval(timer);
      videoTracks.forEach((track) => track.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFace = async () => {
    const snapshotRef = await takeSnapshot();
    const face = await faceapi.detectSingleFace(snapshotRef, tinyFaceDetector);

    if (face?.box) {
      const box = {
        top: face.box.top,
        right: face.box.right,
        bottom: face.box.bottom,
        left: face.box.left,
      };

      console.log(box);

      const faceRef = await drawFaceCanvas(snapshotRef, box);
      detect(snapshotRef, faceRef);
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

    return snapshotRef.current;
  };

  const drawFaceCanvas = async (snapshot, box) => {
    faceRef.current.width = box.right - box.left;
    faceRef.current.height = box.bottom - box.top;

    await faceRef.current
      .getContext("2d")
      .drawImage(
        snapshot,
        box.left,
        box.top,
        faceRef.current.width,
        faceRef.current.height,
        0,
        0,
        faceRef.current.width,
        faceRef.current.height
      );

    return faceRef.current;
  };

  const detect = async (snapshot, face) => {
    let tensor = tf.browser.fromPixels(face);

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

    // if (res[1] > threshold) {
    //   navigate("/photo", { state: { snapshot } });
    // }
  };

  return (
    <>
      <video
        id="camera"
        ref={cameraRef}
        className="object-cover"
        autoPlay
        playsInline
      ></video>

      {result ? (
        result[1] >= threshold ? (
          <Judgment icon="smiling" text="Smiling" />
        ) : (
          <Judgment icon="notSmiling" text="Not Smiling" />
        )
      ) : (
        <Judgment icon="no-face" text="No Face Detected" />
      )}
      <canvas ref={snapshotRef} className="w-full hidden"></canvas>
      <canvas ref={faceRef} className="w-full hidden"></canvas>
    </>
  );
};

export default Camera;
