<template>
  <div></div>
</template>

<script>
import db from "@/firebase/config";
export default {
  data() {
    return {
      games: [],
      platforms: [],
      accounts: []
    };
  },
  methods: {
    getGames() {
      db.collection("games")
        .get()
        .then(snapshot => {
          snapshot.forEach(item => {
            let snapItem = item.data();
            snapItem.id = item.id;
            this.games.push(snapItem);
          });
        });
      this.$store.commit("setGames", this.games);
    },
    getAccounts() {
      db.collection("accounts")
        .get()
        .then(snapshot => {
          snapshot.forEach(item => {
            let snapItem = item.data();
            snapItem.id = item.id;
            this.accounts.push(snapItem);
          });
        });
      this.$store.commit("setAccounts", this.accounts);
    },
    getPlatforms() {
      db.collection("platforms")
        .get()
        .then(snapshot => {
          snapshot.forEach(item => {
            let snapItem = item.data();
            snapItem.id = item.id;
            this.platforms.push(snapItem);
          });
        });
      this.$store.commit("setPlatforms", this.platforms);
    }
  },
  created() {
    this.getGames();
    this.getPlatforms();
    this.getAccounts();
  }
};
</script>
