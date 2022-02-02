<template>
  <div></div>
</template>

<script>
import { mapState } from "vuex";
import FirestoreService from "@/services/FirestoreService.js";
export default {
  data() {
    return {
      games: [],
      platforms: [],
      accounts: [],
    };
  },
  methods: {
    async getGames() {
      this.games = await FirestoreService.getDocuments("game");

      this.$store.commit("setGames", this.games);
    },
    async getAccounts() {
      this.accounts = await FirestoreService.getDocuments("account");

      this.$store.commit("setAccounts", this.accounts);
    },
    async getPlatforms() {
      this.platforms = await FirestoreService.getDocuments("platform");

      this.$store.commit("setPlatforms", this.platforms);
    },
  },
  created() {
    this.getGames();
    this.getPlatforms();
    this.getAccounts();
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
