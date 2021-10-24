import axios from "./service";

export default {
  updateClassify(data) {
    return axios({
      url: "/api/classify/updateClassify",
      method: "POST",
      data,
    });
  },
  getClassify(params) {
    return axios({
      url: "/api/classify/getClassify",
      params,
    });
  },
};
