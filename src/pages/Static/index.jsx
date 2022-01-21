import React, { useState, useContext, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { ImageUploader, Button, Image } from "antd-mobile";
import { UploadOutline } from "antd-mobile-icons";
import "./index.css";
import { ModelContext } from "../../components/Nav";
import { WIDTH, HEIGHT, ILLUSTRATION_URL } from "../../constants";

const Static = () => {
  const [imgList, setImgList] = useState([]);
  const [url, setUrl] = useState("");
  const [isButtonDisplay, setIsButtonDisplay] = useState(false);
  const [isResultDisplay, setIsResultDisplay] = useState(false);
  const [result, setResult] = useState([]);

  const model = useContext(ModelContext);

  useEffect(() => {
    console.log(model);
  }, [model]);

  const mockUpload = (img) => {
    const url = URL.createObjectURL(img);

    setUrl(url);
    setIsButtonDisplay(true);

    return {
      url,
    };
  };

  const startDetect = async () => {
    let img = imgList[0];
    console.log(img);

    const element = document.getElementById("img");
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
            className="fixed bottom-28 right-0 illustration"
            src={ILLUSTRATION_URL}
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
          <img id="img" className="w-20 mt-10 hidden" src={url} alt="img" />
        ) : (
          <></>
        )}

        {isResultDisplay ? (
          <>
            <div className="w-full p-6 rounded-3xl bg-gray-100">
              {/* <h1 className="text-center mb-4 font-bold main-text-color text-xl">
                Result
              </h1> */}
              <div className="flex justify-between mb-4 normal-text-color text-lg">
                <span className="flex items-center">
                  <Image
                    className="mr-2"
                    src={require(`../../assets/smiling.png`)}
                    width={24}
                    height={24}
                  />
                  Smiling
                </span>
                <span>{`${(result[1] * 100).toFixed(6)}%`}</span>
              </div>
              <div className="flex justify-between normal-text-color text-lg">
                <span className="flex items-center">
                  <Image
                    className="mr-2"
                    src={require(`../../assets/notSmiling.png`)}
                    width={24}
                    height={24}
                  />
                  Not Smiling
                </span>
                <span>{`${(result[0] * 100).toFixed(6)}%`}</span>
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
