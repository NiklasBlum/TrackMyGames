<template>
  <div class="mt-3">
    <v-row no-gutters align="center" justify="center">
      <v-col
        v-for="playCount in playCounts"
        :key="playCount.playType"
        class="text-center display-1 py-3"
        :class="playCount.color"
      >
        {{ playCount.playCount }}<v-icon class="ml-1">{{ playCount.icon }}</v-icon>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { PlayType } from "@/models/dbModels.js";
export default {
  data() {
    return {
      playCounts: [],
    };
  },
  methods: {
    getProportion(count) {
      return (count / this.games.length) * 100;
    },
    calculateStatistics() {
      this.playCounts = [];
      for (const key in this.playModes) {
        const playMode = this.playModes[key];
        var gameCount = this.games.filter((game) => {
          return game.playType == playMode.playType;
        });
        var obj = {
          playCount: gameCount.length,
          icon: playMode.icon,
          color: playMode.color,
          playType: playMode.playType,
        };
        this.playCounts.push(obj);
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
    ...mapState(["games", "playModes"]),
    finished() {
      return this.games.filter((game) => {
        return game.playType == PlayType.completed;
      }).length;
    },
    uncategorized() {
      return this.games.filter((game) => {
        return game.playType == PlayType.uncategorized;
      }).length;
    },
    currentlyPlaying() {
      return this.games.filter((game) => {
        return game.playType == PlayType.currentlyPlaying;
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
