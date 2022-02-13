<template>
  <v-app-bar app>
    <v-toolbar-title>
      <v-icon large>mdi-google-controller</v-icon>
      TrackMyGames
    </v-toolbar-title>
    <v-spacer />
    <v-menu left bottom v-if="user">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <Logout />
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
import Logout from "@/components/Auth/Logout.vue";
export default {
  components: {
    Logout,
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>