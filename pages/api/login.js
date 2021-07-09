import axios from "axios";
export default (req, res) => {
  res.status(200).send(req.body);
  axios({
    url: "http://localhost:8000/api/user/login",
    method: "POST",
    data: req.body,
  });
};
