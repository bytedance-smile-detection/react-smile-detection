import axios from 'axios'
import { Toast, Modal } from 'antd-mobile'
import store from '../store'
import { getToken } from "../utils/auth";
import { logout } from "../store/actions";

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: "http://112.124.39.72:8000/api",
  // baseURL: "http://127.0.0.1:8201/mall-portal",
  timeout: 15000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (store.getState().user.token) {
      // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
      config.headers.Authorization = getToken();
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
    // const res = response.data
    // if (res.code !== 200) {
    //   Toast.show({
    //     content: res.message,
    //     position: 'bottom',
    //   })

    //   // 401:未登录;
    //   if (res.code === 401) {
    //     Modal.confirm({
    //       title: "确定登出?",
    //       content:
    //         "由于长时间未操作，您已被登出，可以取消继续留在该页面，或者重新登录",
    //       confirmText: "重新登录",
    //       cancelText: "取消",
    //       onConfirm() {
    //         let token = store.getState().user.token;
    //         store.dispatch(logout(token));
    //       },
    //       onCancel() {
    //         console.log("Cancel");
    //       },
    //     });
    //   }
    //   return Promise.reject('error')
    // } else {
    //   return response.data
    // }
    console.log('response:' + response.data)// for debug
    return response.data
  },
  error => {
    console.log('err:' + error)// for debug
    Toast.show({
      content: error.message,
      position: 'bottom',
    })
    return Promise.reject(error)
  }
)

export default service
