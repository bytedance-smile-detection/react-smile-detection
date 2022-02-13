const WIDTH = 28;
const HEIGHT = 28;
const ILLUSTRATION_URL =
  "https://www.xiaoqw.online/source/smile-detection-illustration.svg";


const LOGINSUCCESS = 'loginSuccess';

let env = process.env.NODE_ENV;
let LENET_MODEL_URL = "";
let FACE_MODEL_URL = "";

if (env === "development") {
  LENET_MODEL_URL = "http://localhost:8000/lenet/model.json";
  FACE_MODEL_URL = "http://localhost:8000/face/model.json";
} else if (env === "production") {
  LENET_MODEL_URL =
    "https://www.xiaoqw.online/smile-detection/models/lenet/model.json";
  FACE_MODEL_URL =
    "https://www.xiaoqw.online/smile-detection/models/face/model.json";
}

export { LENET_MODEL_URL, FACE_MODEL_URL, WIDTH, HEIGHT, ILLUSTRATION_URL };
export { LOGINSUCCESS };