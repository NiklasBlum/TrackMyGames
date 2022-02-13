<template>
  <div>
    <v-tabs fixed-tabs centered v-model="tab">
      <v-tab>Games</v-tab>
      <v-tab>Accounts</v-tab>
      <v-tab>Platforms</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <Statistics />
        <Games />
      </v-tab-item>
      <v-tab-item>
        <Accounts />
      </v-tab-item>
      <v-tab-item>
        <Platforms />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Games from "@/views/Games.vue";
import Accounts from "@/views/Accounts.vue";
import Platforms from "@/views/Platforms.vue";
import Statistics from "@/components/Statistic.vue";
import FirestoreService from "@/services/FirestoreService.js";
export default {
  components: {
    Games,
    Accounts,
    Platforms,
    Statistics,
  },
  data() {
    return {
      tab: null,
    };
  },
  methods: {
    async getPlatforms() {
      const platforms = await FirestoreService.getDocuments("platforms");
      this.$store.commit("setPlatforms", platforms);
    },
    async getGames() {
      const games = await FirestoreService.getDocuments("games");
      this.$store.commit("setGames", games);
    },
    async getAccounts() {
      const accounts = await FirestoreService.getDocuments("accounts");
      this.$store.commit("setAccounts", accounts);
    },
  },
  mounted() {
    this.getPlatforms();
    this.getAccounts();
    this.getGames();
  },
};
</script>
