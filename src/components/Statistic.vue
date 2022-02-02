<template>
  <div>
    <v-chip color="success" class="mb-3">
      <v-icon left>mdi-check-all</v-icon>
      {{ finished }} / {{ total }} games finished
    </v-chip>
    <v-progress-linear :value="proportion" color="success" height="20" />
  </div>
</template>

<script>
export default {
  computed: {
    games: {
      get() {
        return this.$store.state.games;
      },
    },
    finished() {
      return this.games.filter((game) => {
        return game.finished == true;
      }).length;
    },
    total() {
      return this.games.length;
    },
    proportion() {
      return (this.finished / this.total) * 100;
    },
  },
};
</script>
