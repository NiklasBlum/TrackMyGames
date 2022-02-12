<template>
  <div></div>
</template>

<script>
import FirestoreService from "@/services/FirestoreService.js";
export default {
  methods: {
    async getGames() {
      const games = await FirestoreService.getDocuments("games");
      this.$store.commit("setGames", games);
    },
    async getAccounts() {
      const accounts = await FirestoreService.getDocuments("accounts");
      this.$store.commit("setAccounts", accounts);
    },
    async getPlatforms() {
      const platforms = await FirestoreService.getDocuments("platforms");
      this.$store.commit("setPlatforms", platforms);
    },
  },
  created() {
    this.getGames();
    this.getPlatforms();
    this.getAccounts();
  },
};
</script>
