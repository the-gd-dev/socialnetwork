import axios from "axios";
import config from "../nuxt.config";
const baseURL = config.axios.baseURL;
export const axiosGet = async function (url, query = null) {
  try {
    if (query) url = url + "?" + query;
    return await axios.get(baseURL + url);
  } catch ({ response }) {
    throw response;
  }
};
export const axiosPost = async function (url, data) {
  try {
    return await axios.post(baseURL + url, data);
  } catch ({ response }) {
    throw response;
  }
};
