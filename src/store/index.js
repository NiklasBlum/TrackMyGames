import Vue from "vue";
import Vuex from "vuex";
import { GameState, GameStateInfo } from "@/models/localModels.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    platforms: [],
    accounts: [],
    games: [],
    user: null,
    currentView: "games",
    gameStateInfos: [
      new GameStateInfo(
        "0",
        GameState.uncategorized,
        "Uncategorized",
        "I'll pick the category later",
        "mdi-help-circle",
        "brown"
      ),
      new GameStateInfo(
        "1",
        GameState.currentlyPlaying,
        "Currently playing",
        "I play the game regularly",
        "mdi-google-controller",
        "cyan"
      ),
      new GameStateInfo(
        "2",
        GameState.completed,
        "Completed",
        "I reached my goal in the game",
        "mdi-check-all",
        "success"
      ),
      new GameStateInfo(
        "3",
        GameState.played,
        "Played",
        "Won't play anymore",
        "mdi-spider-web",
        "grey"
      ),
      new GameStateInfo(
        "4",
        GameState.notPlayed,
        "Not played",
        "I'll play it later",
        "mdi-google-controller-off",
        "orange"
      ),
      new GameStateInfo(
        "5",
        GameState.wishlist,
        "Wishlist",
        "I want to buy this game",
        "mdi-cart-plus",
        "purple"

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
