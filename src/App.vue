<template>
  <v-app>
    <v-content>
      <AppBar />
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import AppBar from "@/components/Navigation/AppBar.vue";

export default {
  components: {
    AppBar
  }
};
</script>
