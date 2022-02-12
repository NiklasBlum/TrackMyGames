<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12">
        <v-row no-gutters justify="center">
          <NavigationTabs />
        </v-row>
      </v-col>
      <v-col v-show="currentView === 'games'">
        <Statistics />
        <Games />
      </v-col>
      <v-col v-show="currentView === 'accounts'">
        <Accounts />
      </v-col>
      <v-col v-show="currentView === 'platforms'">
        <Platforms />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Games from "@/components/Games.vue";
import Accounts from "@/components/Accounts.vue";
import Platforms from "@/components/Platforms.vue";
import Statistics from "@/components/Statistic.vue";
import NavigationTabs from "@/components/Navigation/NavigationTabs.vue";
import FirestoreService from "@/services/FirestoreService.js";
import { mapState } from "vuex";
export default {
  components: {
    Games,
    Accounts,
    Platforms,
    Statistics,
    NavigationTabs,
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
  computed: {
    ...mapState(["currentView"]),
  },
};
</script>
