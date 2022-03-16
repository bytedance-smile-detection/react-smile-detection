import React, { useState, useContext, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as faceapi from "@vladmandic/face-api";
import { ImageUploader, Button, Image, Toast } from "antd-mobile";
import { UploadOutline } from "antd-mobile-icons";
import "./index.css";
import { ModelContext } from "../../components/Nav";
import {
  WIDTH,
  HEIGHT,
  FACE_MODEL_URL,
  ILLUSTRATION_SVG,
} from "../../constants";

const Static = () => {
  const [imgList, setImgList] = useState([]);
  const [url, setUrl] = useState("");
  const [isButtonDisplay, setIsButtonDisplay] = useState(false);
  const [isResultDisplay, setIsResultDisplay] = useState(false);
  const [result, setResult] = useState([]);
  const faceRef = useRef(null);

  const lenetModel = useContext(ModelContext);
  const tinyFaceDetector = new faceapi.TinyFaceDetectorOptions();

  useEffect(() => {
    const loadModel = async () =>
      await faceapi.nets.tinyFaceDetector.loadFromUri(FACE_MODEL_URL);
    loadModel();
    console.log(lenetModel);
  }, [lenetModel]);

  const mockUpload = (img) => {
    const url = URL.createObjectURL(img);

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
    }
  };

  const drawFaceCanvas = async (img, box) => {
    faceRef.current.width = box.right - box.left;
    faceRef.current.height = box.bottom - box.top;

    await faceRef.current
      .getContext("2d")
      .drawImage(
        img,
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

  const detect = async (face) => {
    let tensor = tf.browser.fromPixels(face);

    const resized = tf.image.resizeBilinear(tensor, [WIDTH, HEIGHT]);
    const batched = resized
      .mean(2)
      .expandDims(0)
      .reshape([-1, WIDTH, HEIGHT, 1]);
    const normalized = batched.toFloat().div(255.0);

    const prediction = await lenetModel.predict(normalized).data();
    const res = Array.from(prediction);

    console.log(res);
    setResult(res);
    setIsButtonDisplay(false);
    setIsResultDisplay(true);
  };

  const reselect = () => {
    setImgList([]);
    setIsButtonDisplay(false);
  };

  const clearResult = () => {
    setImgList([]);
    setIsResultDisplay(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl text-gray-800 font-bold">图像检测</h1>
      <div className="mt-20 flex flex-col justify-center items-center">
        <ImageUploader
          className="img mb-8"
          value={imgList}
          onChange={setImgList}
          upload={mockUpload}
          maxCount={1}
          deletable={false}
        >
          <div className="upload flex justify-center items-center text-gray-300 bg-gray-100 rounded-3xl">
            <UploadOutline fontSize={48} />
          </div>
        </ImageUploader>

        {!imgList.length ? (
          <Image
            className="illustration fixed right-0 illustration"
            src={ILLUSTRATION_SVG}
          />
        ) : (
          <></>
        )}

        {isButtonDisplay ? (
          <>
            <Button
              className="detect-button font-semibold"
              onClick={startDetect}
            >
              开始检测
            </Button>
            <Button
              className="back-button font-semibold"
              onClick={reselect}
              fill="outline"
            >
              重新选择
            </Button>
          </>
        ) : (
          <></>
        )}

        {url ? (
          <>
            <img id="img" className="w-20 mt-10 hidden" src={url} alt="img" />
            <canvas ref={faceRef} className="hidden"></canvas>
          </>
        ) : (
          <></>
        )}

        {isResultDisplay ? (
          <>
            <div className="w-full px-6 py-4 rounded-3xl bg-gray-100">
              {/* <h1 className="text-center mb-4 font-bold main-text-color text-xl">
                Result
              </h1> */}
              <div className="flex justify-between mb-6 normal-text-color text-lg">
                <span className="flex items-center">
                  <Image
                    className="mr-2"
                    src={require(`../../assets/images/smiling.png`)}
                    width={24}
                    height={24}
                  />
                  Smiling
                </span>
                <span>{`${(result[1] * 100).toFixed(4)}%`}</span>
              </div>
              <div className="flex justify-between normal-text-color text-lg">
                <span className="flex items-center">
                  <Image
                    className="mr-2"
                    src={require(`../../assets/images/notSmiling.png`)}
                    width={24}
                    height={24}
                  />
                  Not Smiling
                </span>
                <span>{`${(result[0] * 100).toFixed(4)}%`}</span>
              </div>
            </div>
            <div className="flex justify-between mt-10 mb-28">
              <Button
                className="clear-button font-semibold"
                onClick={clearResult}
              >
                清除结果
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Static;
