import axios from "axios"; // 引入axios
import { getToken } from "@/utils/atuh";

// 创建一个axios实例
const service = axios.create({
  baseURL: "/",
  timeout: 5000
});

// 请求拦截器
axios.defaults.headers.get["content-type"] = "application/json;charset=UTF-8";
service.interceptors.request.use(
  config => {
    console.log(config);
    if (config.method === "post" && config.needToken) {
      if (config.headers["Content-Type"] === "application/json") {
        config.data = {
          ...config.data,
          token: getToken()
        };
      }
    } else if (config.method === "get" && config.needToken) {
      config.data = { unused: 0 }; // 这个是关键点，加入这行就可以了
      config.params = {
        ...config.params,
        token: getToken()
      };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
