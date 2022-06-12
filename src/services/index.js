import axios from "axios";
import qs from "qs";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:8000/api"; // 本地调试
} else {
  axios.defaults.baseURL = "https://www.xiaoqw.online/api"; // 设置全局默认基本信息
}

axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded"; // 设置默认的请求头的 Content-Type

const getRequest = (url, data, token) => axios.get(url, { params: data, headers: { Authorization: `Bearer ${token}` } });
const postRequest = (url, data, token) => axios.post(url, data, { headers: { Authorization: `Bearer ${token}` } });
const uploadRequest = (url, data, token) =>
  axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

// 请求拦截器
axios.interceptors.request.use((config) => {
  if (Object.prototype.toString.call(config.data) !== "[object FormData]") {
    config.data = qs.stringify(config.data);
  }
  return config;
});
// 响应拦截器
axios.interceptors.response.use((response) => response.data);

const Http = {
  postRequest,
  getRequest,
  uploadRequest,
};

export default Http;
