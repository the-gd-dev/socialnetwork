import axios from "axios";
import config from "../nuxt.config";
import cookies from "js-cookie";
import { setAuthToken, resetAuthToken } from "~/utils/auth";
axios.defaults.baseURL = config.axios.baseURL;
const token = cookies.get("authorization");
if (token) setAuthToken(token);
else resetAuthToken();
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let response = error.response;
    let status = response.status;
    if (status === 401) {
      resetAuthToken();
    }
    // Do something with response error
    return Promise.reject(error);
  }
);
