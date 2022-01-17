import React, { useState, useContext, useEffect } from "react";
// import * as tf from "@tensorflow/tfjs";
import { ImageUploader, Button } from "antd-mobile";
import { UploadOutline } from "antd-mobile-icons";
import "./index.css";
import { ModelContext } from "../../components/Nav";
// import { WIDTH, HEIGHT } from "../../constants";

const Static = () => {
  const [imgList, setImgList] = useState([]);
  const [url, setUrl] = useState("");
  const model = useContext(ModelContext);

  useEffect(() => {
    console.log(model);
  }, [model]);

  const mockUpload = (img) => {
    const url = URL.createObjectURL(img);

    setUrl(url);

    return {
      url,
    };
  };

  const startDetect = async () => {
    let img = imgList[0];
    console.log(img);
    console.log(model.predict);

    // const element = document.getElementById("img");

    // let tensor = tf.browser
    //   .fromPixels(element)
    //   .resizeNearestNeighbor([WIDTH, HEIGHT]);
    // tensor.shape.unshift(null);
    // tensor.shape[3] = 1;
    // console.log(tensor);

    // const res = await model.predict(tensor).data();
    // console.log(res);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl text-gray-800 font-bold">图像检测</h1>
      <div className="mt-40 flex flex-col justify-center items-center">
        <ImageUploader
          className="img mb-4"
          value={imgList}
          onChange={setImgList}
          upload={mockUpload}
          maxCount={1}
        >
          <div className="upload flex justify-center items-center text-gray-300 bg-gray-100 rounded-3xl">
            <UploadOutline fontSize={48} />
          </div>
        </ImageUploader>
        {imgList.length ? (
          <Button className="detect-button" onClick={startDetect}>
            开始检测
          </Button>
        ) : (
          <></>
        )}
        {url ? (
          <img id="img" className="w-20 mt-10 hidden" src={url} alt="img" />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Static;
