import React, { useState, useEffect, createContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { LENET_MODEL_URL } from "./constants";
import * as tf from "@tensorflow/tfjs";
import { SpinLoading } from "antd-mobile";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

export const ModelContext = createContext();

const MyApp = () => {
  const [model, setModel] = useState(null);
  const [loadingModel, setLoadingModel] = useState(true);

  useEffect(() => {
    const loadModel = async () => {
      console.log("loading model ...");
      const model = await tf.loadLayersModel(LENET_MODEL_URL);
      setModel(model);
      setLoadingModel(false);
    };

    loadModel();
  }, []);

  return (
    <ModelContext.Provider value={model}>
      {loadingModel ? (
        <div className="loading flex flex-col justify-center items-center">
          <SpinLoading color="#818cf8" />
          <p className="my-theme-color mt-4">loading model ...</p>
        </div>
      ) : (
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )}
    </ModelContext.Provider>
  );
};

ReactDOM.render(<MyApp />, document.getElementById("root"));

serviceWorkerRegistration.register();
