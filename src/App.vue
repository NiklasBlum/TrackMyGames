<template>
  <v-app>
    <v-main>
      <AppBar v-if="user" />
 
      <router-view />
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

<style >
html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
