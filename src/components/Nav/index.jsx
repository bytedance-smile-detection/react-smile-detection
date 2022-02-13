import React, { useState, useEffect, createContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import { Image } from "antd-mobile";
import "./index.css";
import { LENET_MODEL_URL } from "../../constants.js";
import SvgIcon from "../../components/SvgIcon";

export const ModelContext = createContext();

const Nav = (props) => {
  // const [imageIcon, setImageIcon] = useState("image-fill.png");
  // const [cameraIcon, setCameraIcon] = useState("camera.png");
  const [imageIcon, setImageIcon] = useState("image-c");
  const [cameraIcon, setCameraIcon] = useState("camera");
  const [userIcon, setUserIcon] = useState("user");
  const [model, setModel] = useState(null);
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

  //   if (location.pathname === "/") {
  //     setImageIcon("image-fill.png");
  //     setCameraIcon("camera.png");
  //   } else {
  //     setImageIcon("image.png");
  //     setCameraIcon("camera-fill.png");
  //   }
  // }, [location]);
  if (location.pathname === "/") {
    setImageIcon("image-c");
    setCameraIcon("camera");
    setUserIcon("user");
  } else if(location.pathname === "/dynamic"){
    setImageIcon("image");
    setCameraIcon("camera-c");
    setUserIcon("user");
  }else{
    setImageIcon("image");
    setCameraIcon("camera");
    setUserIcon("user-c");
  }
}, [location]);

  // useEffect(() => {
  //   if (!loadingModel) console.log(false);
  // }, [loadingModel]);

  const toStatic = () => {
    navigate("");
  };

  const toDynamic = () => {
    navigate("/dynamic");
  };

  const toUser = () => {
    navigate("/auth");
  };
  

  return (
    <>
      <ModelContext.Provider value={model}>
        <Outlet className="content" />
      </ModelContext.Provider>
      <div className="fixed bottom-0 w-full flex justify-around bg-gray-100 nav">
        {/* <div className="flex justify-center items-center" onClick={toStatic}>
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
        </div> */}
        <div className="flex justify-center items-center"  style={{height:"100%",width:"28px",left:0,top:0}} onClick={toStatic}>
          <SvgIcon iconClass={imageIcon}/>
        </div>
        <div className="flex justify-center items-center"  style={{height:"100%",width:"28px",left:0,top:0}} onClick={toDynamic}>
          <SvgIcon iconClass={cameraIcon}/>
        </div>
        <div className="flex justify-center items-center"  style={{height:"100%",width:"28px",left:0,top:0}} onClick={toUser}>
          <SvgIcon iconClass={userIcon}/>
        </div>
    
      </div>
    </>
  );
};

export default Nav;
