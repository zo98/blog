import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 6000,
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.token;
    config.headers.Authorization = "Bearer " + token;
    return config;
  },
  (err) => {
    return err;
  }
);

export default service;
