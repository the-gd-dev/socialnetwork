import api from "../api";
export const state = () => ({
  reactions: [],
  privacy: [],
});
export const mutations = {
  set_reactions(store, data) {
    store.reactions = data;
  },
  reset_reactions(store) {
    store.reactions = [];
  },
  set_privacy(store, data) {
    store.privacy = data;
  },
  reset_privacy(store) {
    store.privacy = [];
  },
};
export const actions = {
  async fetchReactions({ commit }) {
    try {
      const response = await api.utils.reactions();
      commit("set_reactions", response.data.reactions);
      return response;
    } catch (response) {
      commit("reset_reactions");
      throw response;
    }
  },
  async fetchPrivacy({ commit }) {
    try {
      const response = await api.utils.privacy();
      commit("set_privacy", response.data.privacies);
      return response;
    } catch (response) {
      commit("reset_privacy");
      throw response;
    }
  },
};
export const getters = {
  getReactions(state) {
    return state.reactions;
  },
};
