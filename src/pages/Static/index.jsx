import React, { useState } from "react";
import { ImageUploader } from "antd-mobile";
import { UploadOutline } from "antd-mobile-icons";
import "./index.css";

const Static = () => {
  const [fileList, setFileList] = useState([]);

  const mockUpload = (file) => {
    return {
      url: URL.createObjectURL(file),
    };
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl text-gray-800 font-bold">图像检测</h1>
      <div className="mt-40 text-center">
        <ImageUploader
          className="img"
          value={fileList}
          onChange={setFileList}
          upload={mockUpload}
          maxCount={1}
        >
          <div className="upload flex justify-center items-center text-gray-300 bg-gray-100 rounded-3xl">
            <UploadOutline fontSize={48} />
          </div>
        </ImageUploader>
      </div>
    </div>
  );
};

export default Static;
