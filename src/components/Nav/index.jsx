import React, { useState, useEffect, createContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import { Image } from "antd-mobile";
import "./index.css";
import { LENET_MODEL_URL, LOGINSUCCESS } from "../../constants.js";
import PubSub from "pubsub-js";

export const ModelContext = createContext();

const Nav = (props) => {
  const [imageIcon, setImageIcon] = useState("image-fill.png");
  const [cameraIcon, setCameraIcon] = useState("camera.png");
  const [model, setModel] = useState(null);
  const [login, setLogin] = useState(false)
  // const [loadingModel, setLoadingModel] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadModel = async () => {
      console.log("loading model ...");
      const model = await tf.loadLayersModel(LENET_MODEL_URL);
      setModel(model);
      // setLoadingModel(false);
    };

    loadModel();

    if (location.pathname === "/") {
      setImageIcon("image-fill.png");
      setCameraIcon("camera.png");
    } else {
      setImageIcon("image.png");
      setCameraIcon("camera-fill.png");
    }
  }, [location]);

  PubSub.subscribe(LOGINSUCCESS, (msg, data) => {
    setLogin(data)
  })

  // useEffect(() => {
  //   if (!loadingModel) console.log(false);
  // }, [loadingModel]);

  const toStatic = () => {
    navigate("");
  };

  const toDynamic = () => {
    navigate("/dynamic");
  };

  const toLogin = () => {
    navigate("/Login")
  };

  return (
    <>
      <ModelContext.Provider value={model}>
        <Outlet className="content" />
      </ModelContext.Provider>
      <div className="fixed bottom-0 w-full flex justify-around bg-gray-100 nav">
        <div className="flex justify-center items-center" onClick={toStatic}>
          <Image
            src={require(`../../assets/${imageIcon}`)}
            width={28}
            height={28}
          />
        </div>
        {/* 
        <div className="flex justify-center items-center" onClick={toDynamic}>
        */}
        <div className="flex justify-center items-center" onClick={login ? toDynamic : toLogin}>
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
