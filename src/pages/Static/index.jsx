import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import * as faceapi from "@vladmandic/face-api";
import { ImageUploader, Button, Image, Toast } from "antd-mobile";
import { UploadOutline } from "antd-mobile-icons";
import "./index.css";
import { ModelContext } from "../../index";
import { WIDTH, HEIGHT, BACKEND_URL, FACE_MODEL_URL } from "../../constants";

const Static = () => {
  const [imgList, setImgList] = useState([]);
  const [imgBlob, setImgBlob] = useState(null);
  const [url, setUrl] = useState("");
  const [isButtonDisplay, setIsButtonDisplay] = useState(false);
  const faceRef = useRef(null);
  const navigate = useNavigate();

  const lenetModel = useContext(ModelContext);
  const tinyFaceDetector = new faceapi.TinyFaceDetectorOptions();

  useEffect(() => {
    const loadModel = async () => await faceapi.nets.tinyFaceDetector.loadFromUri(FACE_MODEL_URL);
    loadModel();
    console.log(lenetModel);
  }, [lenetModel]);

  const mockUpload = (img) => {
    const url = URL.createObjectURL(img);

    setImgBlob(img);
    setUrl(url);
    setIsButtonDisplay(true);

    return {
      url,
    };
  };

  const startDetect = async () => {
    const img = document.getElementById("img");
    getFace(img);
  };

  const getFace = async (img) => {
    const face = await faceapi.detectSingleFace(img, tinyFaceDetector);
    if (!face) {
      Toast.show({ content: "No faces detected", position: "bottom" });
      return;
    }

    if (face?.box) {
      const { box } = face;
      console.log(box);

      const faceRef = await drawFaceCanvas(img, box);
      detect(img, faceRef);
    } else {
      navigate("/photo", { state: { url, result: null, prePage: "static" } });
    }
  };

  const drawFaceCanvas = async (img, box) => {
    faceRef.current.width = box.right - box.left;
    faceRef.current.height = box.bottom - box.top;

    await faceRef.current.getContext("2d").drawImage(img, box.left, box.top, faceRef.current.width, faceRef.current.height, 0, 0, faceRef.current.width, faceRef.current.height);

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
    navigate("/photo", { state: { url, result: res, imgBlob, prePage: "static" } });
  };

  const reselect = () => {
    setImgList([]);
    setIsButtonDisplay(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl text-gray-800 font-bold">Image Detection</h1>
      <div className="mt-12 flex flex-col justify-center items-center">
        <ImageUploader className="img mb-8" value={imgList} onChange={setImgList} upload={mockUpload} maxCount={1} deletable={false}>
          <div className="upload flex justify-center items-center text-gray-300 bg-gray-100 rounded-3xl">
            <UploadOutline fontSize={48} />
          </div>
        </ImageUploader>

        {!imgList.length ? <Image className="illustration fixed right-0" src={`${BACKEND_URL}/images/face-detection.svg`} /> : <></>}

        {isButtonDisplay ? (
          <>
            <Button className="detect-button font-semibold" onClick={startDetect}>
              Detect
            </Button>
            <Button className="reselect-button font-semibold" onClick={reselect} fill="outline">
              Reselect
            </Button>
          </>
        ) : (
          <></>
        )}

        {url ? (
          <>
            <img id="img" className="w-20 hidden" src={url} alt="img" />
            <canvas ref={faceRef} className="hidden"></canvas>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Static;
