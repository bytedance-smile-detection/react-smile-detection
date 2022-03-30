const WIDTH = 28;
const HEIGHT = 28;

// const BACKEND_URL = "http://localhost:8000"; // development env
const BACKEND_URL = "http://www.xiaoqw.icu"; // production env

const LENET_MODEL_URL = `${BACKEND_URL}/models/lenet/model.json`;
const FACE_MODEL_URL = `${BACKEND_URL}/models/face/model.json`;

const ILLUSTRATION_SVG = "https://www.xiaoqw.online/source/smile-detection-illustration.svg";
const NOT_LOGGED_IN_SVG = "https://www.xiaoqw.online/source/smile-detection-not-logged-in.svg";

export { WIDTH, HEIGHT, LENET_MODEL_URL, FACE_MODEL_URL, ILLUSTRATION_SVG, NOT_LOGGED_IN_SVG };
