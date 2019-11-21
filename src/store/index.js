import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    platforms: null,
    accounts: null,
    games: null
  },
  mutations: {
    setPlatforms(state, platforms) {
      state.platforms = platforms;
    },
    setAccounts(state, accounts) {
      state.accounts = accounts;
    },
    setGames(state, games) {
      state.games = games;
    }
  },
  actions: {},
  modules: {}
});
