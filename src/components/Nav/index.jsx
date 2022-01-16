import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Image } from "antd-mobile";
import "./index.css";

const Nav = () => {
  // const [mediaStreamTrack, setMediaStreamTrack] = useState(null);
  const [imageIcon, setImageIcon] = useState("image-fill.png");
  const [cameraIcon, setCameraIcon] = useState("camera.png");
  const navigate = useNavigate();

  const toStatic = () => {
    navigate("");
    setImageIcon("image-fill.png");
    setCameraIcon("camera.png");
  };

  const toDynamic = () => {
    navigate("/dynamic");
    setImageIcon("image.png");
    setCameraIcon("camera-fill.png");
  };

  return (
    <>
      <Outlet className="content" />
      <div className="fixed bottom-0 w-full flex justify-around bg-gray-100 nav">
        <div className="flex justify-center items-center" onClick={toStatic}>
          <Image
            src={require(`../../assets/${imageIcon}`)}
            width={28}
            height={28}
          />
        </div>
        <div className="flex justify-center items-center" onClick={toDynamic}>
          <Image
            src={require(`../../assets/${cameraIcon}`)}
            width={28}
            height={28}
          />
        </div>
      </div>
    </>
  );
};

export default Nav;
