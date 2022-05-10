import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import * as faceapi from "@vladmandic/face-api";
import { Button } from "antd-mobile";
import SvgIcon from "../SvgIcon";
import "./index.css";
import { ModelContext } from "../../index";
import { WIDTH, HEIGHT, FACE_MODEL_URL } from "../../constants";

const Camera = () => {
  const lenetModel = useContext(ModelContext);
  const cameraRef = useRef(null);
  const snapshotRef = useRef(null);
  const faceRef = useRef(null);
  const navigate = useNavigate();

  const tinyFaceDetector = new faceapi.TinyFaceDetectorOptions();

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
      videoTracks[0].stop();
    };
  }, []);

  const takeSnapshot = async () => {
    snapshotRef.current.width = cameraRef.current.videoWidth;
    snapshotRef.current.height = cameraRef.current.videoHeight;

    await snapshotRef.current.getContext("2d").drawImage(cameraRef.current, 0, 0, snapshotRef.current.width, snapshotRef.current.height);

    const face = await faceapi.detectSingleFace(snapshotRef.current, tinyFaceDetector);
    const src = snapshotRef.current.toDataURL("image/jpg");

    if (face?.box) {
      const { box } = face;
      const faceRefCurrent = await drawFaceCanvas(snapshotRef.current, box);
      detect(faceRefCurrent, src);
    } else {
      navigate("/photo", { state: { url: src, result: null, prePage: "dynamic" } });
    }
  };

  const drawFaceCanvas = async (snapshot, box) => {
    faceRef.current.width = box.right - box.left;
    faceRef.current.height = box.bottom - box.top;

    await faceRef.current.getContext("2d").drawImage(snapshot, box.left, box.top, faceRef.current.width, faceRef.current.height, 0, 0, faceRef.current.width, faceRef.current.height);

    return faceRef.current;
  };

  const detect = async (face, src) => {
    let tensor = tf.browser.fromPixels(face);

    const resized = tf.image.resizeBilinear(tensor, [WIDTH, HEIGHT]);
    const batched = resized.mean(2).expandDims(0).reshape([-1, WIDTH, HEIGHT, 1]);
    const normalized = batched.toFloat().div(255.0);

    const prediction = await lenetModel.predict(normalized).data();
    const res = Array.from(prediction);

    console.log(res);
    navigate("/photo", { state: { url: src, result: res, prePage: "dynamic" } });
  };

  const takePhoto = () => {
    takeSnapshot();
  };

  return (
    <>
      <video id="camera" ref={cameraRef} className="w-full" autoPlay playsInline></video>
      <div className="manual-bottom-area flex justify-center py-2 bg-gray-100">
        <Button className="take-photo-button p-0" onClick={takePhoto}>
          <SvgIcon name="take-photo-button" width={70} height={70} />
        </Button>
      </div>

      <canvas ref={snapshotRef} className="w-full hidden"></canvas>
      <canvas ref={faceRef} className="w-full hidden"></canvas>
    </>
  );
};

export default Camera;
