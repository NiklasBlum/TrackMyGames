<template>
  <div class="mt-3">
    <v-row no-gutters align="center" justify="center">
      <v-col
        v-for="item in gameStateStatistics"
        :key="item.icon"
        class="text-center display-1 py-3"
        :class="item.color"
      >
        <span class="mt-1">
          {{ item.gameCount }}
        </span>
        <v-icon class="ml-1" size="40">{{ item.icon }}</v-icon>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      gameStateStatistics: [],
    };
  },
  methods: {
    getProportion(count) {
      return (count / this.totalGamesAmount) * 100;
    },
    calculateStatistics() {
      this.gameStateStatistics = [];
      for (const key in this.gameStateInfos) {
        const gameStateInfo = this.gameStateInfos[key];
        var gameCount = this.games.filter((game) => {
          return game.gameStateId == gameStateInfo.id;
        });
        var obj = {
          gameCount: gameCount.length,
          icon: gameStateInfo.icon,
          color: gameStateInfo.color,
        };
        this.gameStateStatistics.push(obj);
      }
    },
  },
  watch: {
    games() {
      this.calculateStatistics();
    },
  },
  created() {
    this.calculateStatistics();
  },
  computed: {
    ...mapState(["games", "gameStateInfos"]),
    totalGamesAmount() {
      return this.games.length;
    },
    proportion() {
      return (this.finished / this.totalGamesAmount) * 100;
    },
  },
};
</script>
