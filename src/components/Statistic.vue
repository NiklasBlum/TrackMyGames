<template>
  <div class="mt-2">
    <v-row no-gutters align="center" justify="center">
      <v-col
        v-for="item in gameStateStatistics"
        :key="item.icon"
        class="text-center display-1 py-3"
        :class="item.color"
      >
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              {{ item.gameCount }}
              <v-icon class="ml-1" size="40">
                {{ item.icon }}
              </v-icon>
            </span>
          </template>
          <span>{{ item.title }}</span>
        </v-tooltip>
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
    calculateStatistics() {
      this.gameStateStatistics = [];
      for (const key in this.gameStateInfos) {
        const gameStateInfo = this.gameStateInfos[key];
        var gameCount = this.games.filter((game) => {
          return game.gameStateId == gameStateInfo.id;
        });
        this.gameStateStatistics.push({
          gameCount: gameCount.length,
          icon: gameStateInfo.icon,
          color: gameStateInfo.color,
          title: gameStateInfo.title
        });
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
  },
};
</script>
