import React, { useEffect, useRef } from "react";
import "./index.css";

const Camera = () => {
  const cameraRef = useRef(null);

  useEffect(() => {
    const getUserMedia = async () => {
      const constraints = {
        video: true,
      };
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        cameraRef.current.srcObject = stream;
      } catch (err) {
        console.log(err);
      }
    };

    getUserMedia();
  }, []);

  return (
    <>
      <video
        id="camera"
        ref={cameraRef}
        className="object-cover h-screen"
        autoPlay
        muted
        playsInline
      ></video>
    </>
  );
};

export default Camera;
