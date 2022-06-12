const WIDTH = 28;
const HEIGHT = 28;

let BACKEND_URL;

if (process.env.NODE_ENV === "development") {
  BACKEND_URL = "http://localhost:8000"; // development env
} else {
  BACKEND_URL = "https://www.xiaoqw.online"; // production env
}

const LENET_MODEL_URL = `${BACKEND_URL}/models/lenet/model.json`;
const FACE_MODEL_URL = `${BACKEND_URL}/models/face/model.json`;

const AVATAR = `${BACKEND_URL}/images/avatar.jpg`;

export { WIDTH, HEIGHT, BACKEND_URL, LENET_MODEL_URL, FACE_MODEL_URL, AVATAR };
