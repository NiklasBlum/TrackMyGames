import Vue from "vue";
import Vuex from "vuex";
import { PlayMode, PlayType } from "@/models/dbModels.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    platforms: [],
    accounts: [],
    games: [],
    user: null,
    currentView: "games",
    playModes: [
      new PlayMode(
        PlayType.uncategorized,
        "Uncategorized",
        "I'll pick the category later",
        "mdi-help-circle",
        "warning"
      ),
      new PlayMode(
        PlayType.currentlyPlaying,
        "Currently playing",
        "I play the game regularly",
        "mdi-google-controller",
        "cyan"
      ),
      new PlayMode(
        PlayType.completed,
        "Completed",
        "I reached my goal in the game",
        "mdi-medal",
        "success"
      ),
      new PlayMode(
        PlayType.played,
        "Played",
        "Won't play anymore",
        "mdi-spider-web",
        "light-gray"
      ),
      new PlayMode(
        PlayType.notPlayed,
        "Not played",
        "I'll play it later",
        "mdi-archive-plus",
        "purple"
      ),
      new PlayMode(
        PlayType.wishlist,
        "Wishlist",
        "I want to buy this game",
        "mdi-cart-plus",
        "orange"
      ),
    ],
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
