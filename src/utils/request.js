import axios from "axios";
import store from "@/store/auth.js";
import { ElMessageBox, ElMessage } from "element-plus";

const service = axios.create({
  baseURL: "http://localhost:5054/api", // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

service.interceptors.request.use(
  //拦截器，use()有两个参数，分别是请求之前和失败时的回调函数，前面那个变量是参数名,表示当前请求的配置对象/错误对象
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
      return config;
    } else {
      return config;
    }
  },
  (err) => {
    console.log(err); // for debug
    return Promise.reject(err);
  }
);
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // 处理 401 错误（未授权/Token 过期等）
      ElMessage.error("Token 已过期，请重新登录");
    //   store.dispatch("logout"); // 或其他逻辑，例如清除 token
    //   router.push("/login");
    }
    return Promise.reject(error);
  }
);
export default service;
