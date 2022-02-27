<template>
  <v-container fluid>
    <v-tabs fixed-tabs centered v-model="tab">
      <v-tab>Games</v-tab>
      <v-tab>Accounts</v-tab>
      <v-tab>Platforms</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-row no-gutters>
          <v-col cols="12">
            <Statistics />
          </v-col>
          <v-col cols="12">
            <GameTable />
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <AccountList />
      </v-tab-item>
      <v-tab-item>
        <PlatformList />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import GameTable from "@/components/Game/GameTable.vue";
import AccountList from "@/components/Account/AccountList.vue";
import PlatformList from "@/components/Platform/PlatformList.vue";
import Statistics from "@/components/Statistic.vue";
import FirestoreService from "@/services/FirestoreService.js";
export default {
  components: {
    GameTable,
    AccountList,
    PlatformList,
    Statistics,
  },
  data() {
    return {
      tab: null,
    };
  },
  methods: {
    async getPlatforms() {
      this.$store.commit(
        "setPlatforms",
        await FirestoreService.getDocuments("platforms")
      );
    },
    async getGames() {
      this.$store.commit(
        "setGames",
        await FirestoreService.getDocuments("games")
      );
    },
    async getAccounts() {
      this.$store.commit(
        "setAccounts",
        await FirestoreService.getDocuments("accounts")
      );
    },
  },
  mounted() {
    this.getPlatforms();
    this.getAccounts();
    this.getGames();
  },
};
</script>
