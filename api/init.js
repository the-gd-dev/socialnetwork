import axios from "axios";
import config from "../nuxt.config";
import cookies from "js-cookie";
import { setAuthToken, resetAuthToken } from "~/utils/auth";
axios.defaults.baseURL = config.axios.baseURL;
const token = cookies.get("authorization");
if (token) setAuthToken(token);
else resetAuthToken();
