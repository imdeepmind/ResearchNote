import Axios from "axios";

let axios = null;
if (process.env["REACT_APP_NODE_ENV"] === 'development') {
   axios = Axios.create({
    baseURL: process.env["REACT_APP_API_URL_DEV"],
  });
} else {
  axios = Axios.create({
    baseURL: process.env["REACT_APP_API_URL_PROD"],
  });
}

axios.interceptors.request.use((config) => {
  let token = localStorage.getItem("id_token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error && error.response && error.response.status === 401) {
    localStorage.removeItem("id_token");
    window.location = "/";
  }
  return Promise.reject(error);
});

export default axios;