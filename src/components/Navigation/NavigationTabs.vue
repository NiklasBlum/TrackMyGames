<template>
  <v-btn-toggle rounded mandatory v-model="currentView">
    <v-btn value="games">Games</v-btn>
    <v-btn value="accounts">Accounts</v-btn>
    <v-btn value="platforms">Platforms</v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  computed: {
    currentView: {
      get() {
        return this.$store.state.currentView;
      },
      set(view) {
        this.$store.commit("setCurrentView", view);
      }
    }
  }
};
</script>
