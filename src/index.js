import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./icons";
import { Provider } from 'react-redux';
import store from './store';
ReactDOM.render(
  <Provider store={store}>
  <HashRouter>
    <App />
  </HashRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
