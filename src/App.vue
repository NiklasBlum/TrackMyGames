<template>
  <v-app>
    <v-main>
      <AppBar v-if="user" />
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import AppBar from "@/components/Navigation/AppBar.vue";
import { mapState } from "vuex";
import FirestoreService from "@/services/FirestoreService.js";

export default {
  components: {
    AppBar,
  },
  methods: {
    checkIfFirstLogin() {
      FirestoreService.createUserIfNotExists();
    },
  },
  watch: {
    user() {
      if (this.user) this.checkIfFirstLogin();
    },
  },
  computed: { ...mapState(["user"]) },
};
</script>
