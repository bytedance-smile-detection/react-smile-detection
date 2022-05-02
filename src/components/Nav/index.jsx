import React, { useState, useEffect, createContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SpinLoading } from "antd-mobile";
import SvgIcon from "../SvgIcon";
import * as tf from "@tensorflow/tfjs";
import "./index.css";
import { HEIGHT, LENET_MODEL_URL, WIDTH } from "../../constants.js";

export const ModelContext = createContext();

const Nav = () => {
  const [cameraIcon, setCameraIcon] = useState("camera");
  const [imageIcon, setImageIcon] = useState("image-c");
  const [userIcon, setUserIcon] = useState("user");
  const [model, setModel] = useState(null);
  const [loadingModel, setLoadingModel] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadModel = async () => {
      console.log("loading model ...");
      const model = await tf.loadLayersModel(LENET_MODEL_URL);
      setModel(model);
      setLoadingModel(false);
    };

    loadModel();
  }, []);

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

  // useEffect(() => {
  //   if (!loadingModel) console.log(false);
  // }, [loadingModel]);

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
      <ModelContext.Provider value={model}>
        {loadingModel ? (
          <div className="loading flex flex-col justify-center items-center">
            <SpinLoading color="#818cf8" />
            <p className="my-theme-color mt-4">loading model ...</p>
          </div>
        ) : (
          <Outlet />
        )}
      </ModelContext.Provider>

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
