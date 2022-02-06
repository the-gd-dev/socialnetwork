import { axiosGet, axiosPost } from "~/helpers/axiosHelpers";
export default {
  utils: {
    languages: async (country) => await axiosGet("utilities/languages", "country="+country),
    reactions: async () => await axiosGet("utilities/reactions"),
    privacy: async () => await axiosGet("utilities/privacies"),
  },
  auth: {
    me: async () => await axiosGet("profile"),
    login: async (data) => await axiosPost("login", data),
  },
};
