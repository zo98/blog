import axios from "./service";
export default {
  getSystemInfo() {
    return axios({
      url: "/api/system/getInfo",
    });
  },
  updateSystemInfo(data) {
    return axios({
      url: "/api/system/update",
      method: "POST",
      data,
    });
  },
};
