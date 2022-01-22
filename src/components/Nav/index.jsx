import React, { useState, useEffect, createContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import { Image } from "antd-mobile";
import "./index.css";
import { LENET_MODEL_URL } from "../../constants.js";

export const ModelContext = createContext(null);

const Nav = (props) => {
  const [imageIcon, setImageIcon] = useState("image-fill.png");
  const [cameraIcon, setCameraIcon] = useState("camera.png");
  const [model, setModel] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadModel = async () => {
      console.log("loading model ...");
      const model = await tf.loadLayersModel(LENET_MODEL_URL);

      setModel(model);
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

  const toStatic = () => {
    navigate("");
  };

  const toDynamic = () => {
    navigate("/dynamic");
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
