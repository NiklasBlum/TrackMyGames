<template>
  <v-chip color="success">
    <v-icon left>mdi-check-all</v-icon>
    {{ finished }} / {{ total }} games finished
  </v-chip>
</template>

<script>
export default {
  computed: {
    games: {
      get() {
        return this.$store.state.games;
      }
    },
    finished() {
      return this.games.filter(game => {
        return game.Finished == true;
      }).length;
    },
    total() {
      return this.games.length;
    }
  }
};
</script>
