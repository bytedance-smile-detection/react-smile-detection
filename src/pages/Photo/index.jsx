import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Image, Button, Toast } from "antd-mobile";
import SvgIcon from "../../components/SvgIcon";
import { base64ToFile, blobToFile, uploadImage } from "../../utils";
import "./index.css";

const Photo = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { url, result, prePage } = state;
  let file = null;
  let resultShow = null;

  if (prePage === "dynamic") {
    file = base64ToFile(url);
  } else if (prePage === "static") {
    const { imgBlob } = state;
    file = blobToFile(imgBlob);
  }

  if (!result) {
    resultShow = (
      <div className="flex justify-between normal-text-color text-lg">
        <SvgIcon className="mr-2" name="no-face" width={24} height={24} />
        No faces detected
      </div>
    );
  } else {
    resultShow = (
      <>
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
      </>
    );
  }

  const goBack = () => {
    if (prePage === "dynamic") {
      navigate("/");
    } else if (prePage === "static") {
      navigate("/static");
    }
  };

  const saveImage = async () => {
    try {
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
      <div className="result">
        <Image className="w-4/5" src={url} />
        <div className="px-6 py-4 mt-8 rounded-3xl bg-gray-100">{resultShow}</div>
      </div>

      <div className="two-button px-6 pb-6">
        <div className="flex justify-between items-center mt-10">
          <Button className="back-button font-semibold" onClick={goBack} fill="outline">
            Back
          </Button>
          <Button className="save-button font-semibold" onClick={saveImage}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default Photo;
