import { setAuthToken, resetAuthToken } from "~/utils/auth";
import cookies from "js-cookie";
import api from "../api";
export const state = () => ({
  user: null,
});
export const mutations = {
  set_user(store, data) {
    store.user = data;
  },
  reset_user(store) {
    store.user = null;
  },
};
export const actions = {
  async fetch({ commit }) {
    try {
      const response = await api.auth.me();
      commit("set_user", response.data.user);
      return response;
    } catch (response) {
      commit("reset_user");
      throw response;
    }
  },
  async login({ commit }, data) {
    try {
      const response = await api.auth.login(data);
      setAuthToken(response.data.token);
      cookies.set("authorization", response.data.token, { expires: 7 });
      return response;
    } catch (response) {
      throw response;
    }
  },
  reset({ commit }) {
    commit("reset_user");
    resetAuthToken();
    cookies.remove("authorization");
    return Promise.resolve();
  },
};
