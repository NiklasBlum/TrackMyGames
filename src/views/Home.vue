<template>
  <div>
    <Startup />
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
import Startup from "@/components/Startup.vue";
import Games from "@/components/Games.vue";
import Accounts from "@/components/Accounts.vue";
import Platforms from "@/components/Platforms.vue";
import Statistics from "@/components/Statistic.vue";
import NavigationTabs from "@/components/Navigation/NavigationTabs.vue";
import { mapState } from "vuex";
export default {
  components: {
    Startup,
    Games,
    Accounts,
    Platforms,
    Statistics,
    NavigationTabs,
  },
  computed: {
    ...mapState(["currentView"]),
  },
};
</script>
