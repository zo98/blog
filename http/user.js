import axios from "./service";

export default {
  login(data) {
    return axios({
      url: "/api/user/login",
      method: "POST",
      data,
    });
  },
};
