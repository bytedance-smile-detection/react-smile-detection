const WIDTH = 28;
const HEIGHT = 28;

// const BACKEND_URL = "http://localhost:8000"; // development env
const BACKEND_URL = "https://www.xiaoqw.icu"; // production env

const LENET_MODEL_URL = `${BACKEND_URL}/models/lenet/model.json`;
const FACE_MODEL_URL = `${BACKEND_URL}/models/face/model.json`;

export { WIDTH, HEIGHT, BACKEND_URL, LENET_MODEL_URL, FACE_MODEL_URL };
