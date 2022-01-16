import React, { useState, useEffect } from "react";
import "./index.css";

const Camera = () => {
  const [camera, setCamera] = useState(null);
  const [mediaStreamTrack, setMediaStreamTrack] = useState(null);

  useEffect(() => {
    const temp = document.getElementById("camera");

    //成功回调
    const success = (stream) => {
      const mediaStreamTrack =
        typeof stream.stop === "function" ? stream : stream.getTracks()[1];

      //兼容webkit核心浏览器
      // const CompatibleURL = window.URL || window.webkitURL;
      //将视频流设置为video元素的源
      // video.src = CompatibleURL.createObjectURL(stream);
      setMediaStreamTrack(mediaStreamTrack);
      camera.srcObject = stream;
      camera.play();
    };

    //失败回调
    const error = (error) => {
      console.log("失败");
      console.log("访问用户媒体设备失败", error);
    };

    setCamera(temp);
    //访问摄像头
    if (
      navigator.mediaDevices.getUserMedia ||
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia
    ) {
      //调用用户媒体设备, 访问摄像头
      getUserMedia({ video: { facingMode: "user" } }, success, error);
    } else {
      alert("不支持访问用户媒体");
    }

    return () => {
      setCamera(null);
      mediaStreamTrack && mediaStreamTrack.stop();
    };
  }, [camera, mediaStreamTrack]);

  const getUserMedia = (constraints, success, error) => {
    if (navigator.mediaDevices.getUserMedia) {
      //最新的标准API
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(success)
        .catch(error);
    } else if (navigator.webkitGetUserMedia) {
      //webkit核心浏览器
      navigator.webkitGetUserMedia(constraints, success, error);
    } else if (navigator.mozGetUserMedia) {
      //firefox浏览器
      navigator.mozGetUserMedia(constraints, success, error);
    } else if (navigator.getUserMedia) {
      //旧版API
      navigator.getUserMedia(constraints, success, error);
    }
  };

  return (
    <>
      <video id="camera" className="object-cover h-screen"></video>
    </>
  );
};

export default Camera;
