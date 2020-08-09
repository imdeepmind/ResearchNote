import Axios from "axios";

let axios = Axios.create({
  baseURL: process.env["REACT_APP_API_URL"],
});

axios.interceptors.request.use((config) => {
  let token = localStorage.getItem("id_token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default axios;