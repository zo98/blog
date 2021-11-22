import axios from "axios";
import { message } from "antd";
const service = axios.create({
  // baseURL: "http://localhost:3000",
  timeout: 6000,
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.token;
    config.headers.Authorization = "Bear " + token;
    return config;
  },
  (err) => {
    return err;
  }
);

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 401:
          if (!window.message) {
            window.message = true;
            message.warning("请先登陆");
            // location.href = "/auth"
          }
          break;
        // case 404:
        //   alert("404");
        //   break;
        // case 500:
        //   alert("500");
        //   break;
      }
    }
  }
);

export default service;
