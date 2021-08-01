import axios from "axios";

const service = axios.create({
  // baseURL: "http://localhost:3000",
  timeout: 6000,
});

service.interceptors.request.use(
  (config) => {
    // const token = localStorage.token;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmlja19uYW1lIjoiYWRtaW4iLCJhY2NvdW50IjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYSQxMCRtZmlSQnl0b2RnTWt1bmRsU2hWZ3hPYkU1QVYxNmFrZ25qWXFmMW94R0tBaW03SWg1NlJvUyIsImNyZWF0ZV90aW1lIjoiMjAyMS0wNy0yN1QwNzoyNjoxNi4wMDBaIiwiaWF0IjoxNjI3NzkwMDAzLCJleHAiOjE2Mjc4MTE2MDN9.oFAxci2C2RtPnb_mY8Rol3TOWnZ6QskPCt0cDLL5utw";
    config.headers.Authorization = "Bear " + token;
    return config;
  },
  (err) => {
    return err;
  }
);

export default service;
