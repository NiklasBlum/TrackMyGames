import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    platforms: null,
    accounts: null,
    games: null,
    user: null,
    currentView: "games"
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
    },
    setUser(state, user) {
      state.user = user;
    },
    setCurrentView(state, view) {
      state.currentView = view;
    }
  }
});
