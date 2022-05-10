import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import SvgIcon from "../SvgIcon";
import "./index.css";
import { HEIGHT, WIDTH } from "../../constants.js";

const Nav = () => {
  const [cameraIcon, setCameraIcon] = useState("camera");
  const [imageIcon, setImageIcon] = useState("image-c");
  const [userIcon, setUserIcon] = useState("user");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setCameraIcon("camera-c");
      setImageIcon("image");
      setUserIcon("user");
    }
    if (location.pathname === "/static") {
      setCameraIcon("camera");
      setImageIcon("image-c");
      setUserIcon("user");
    }
    if (location.pathname === "/user") {
      setCameraIcon("camera");
      setImageIcon("image");
      setUserIcon("user-c");
    }
  }, [location]);

  const toDynamic = () => {
    navigate("/");
  };

  const toStatic = () => {
    navigate("/static");
  };

  const toUser = () => {
    navigate("/user");
  };

  return (
    <>
      <Outlet />

      <div className="nav fixed w-full flex justify-around bg-gray-100">
        <div className="flex justify-center items-center" onClick={toDynamic}>
          <SvgIcon name={cameraIcon} width={WIDTH} height={HEIGHT} />
        </div>
        <div className="flex justify-center items-center" onClick={toStatic}>
          <SvgIcon name={imageIcon} width={WIDTH} height={HEIGHT} />
        </div>
        <div className="flex justify-center items-center" onClick={toUser}>
          <SvgIcon name={userIcon} width={WIDTH} height={HEIGHT} />
        </div>
      </div>
    </>
  );
};

export default Nav;
