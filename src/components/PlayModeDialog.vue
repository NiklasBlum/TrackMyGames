<template>
  <v-list>
    <v-list-item-group v-model="selectedPlayModeIndex" mandatory>
      <v-list-item
        v-for="playMode in playModes"
        :key="playMode.title"
        @click="setPlayMode(playMode)"
      >
        <v-list-item-icon>
          <v-icon size="30" v-text="playMode.icon" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="playMode.title" />
          <v-list-item-subtitle v-text="playMode.description" />
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
<script>
import { PlayMode, PlayType } from "@/models/dbModels.js";

export default {
  props: {
    playType: String,
  },
  data() {
    return {
      selectedPlayModeIndex: null,
      playModes: [
        new PlayMode(
          PlayType.uncategorized,
          "Uncategorized",
          "I'll pick the category later",
          "mdi-help-circle"
        ),
        new PlayMode(
          PlayType.currentlyPlaying,
          "Currently playing",
          "I play the game regularly",
          "mdi-google-controller"
        ),
        new PlayMode(
          PlayType.completed,
          "Completed",
          "I reached my goal in the game",
          "mdi-medal"
        ),
        new PlayMode(
          PlayType.played,
          "Played",
          "Won't play anymore",
          "mdi-spider-web"
        ),
        new PlayMode(
          PlayType.notPlayed,
          "Not played",
          "I'll play it later",
          "mdi-archive-plus"
        ),
        new PlayMode(
          PlayType.wishlist,
          "Wishlist",
          "I want to buy this game",
          "mdi-cart-plus"
        ),
      ],
    };
  },
  methods: {
    setPlayMode(mode) {
      this.$emit("playModeChanged", mode.playType);
    },
    selectPlayMode() {
      this.selectedPlayModeIndex = this.playModes.findIndex((object) => {
        return object.playType === this.playType;
      });
      if (this.selectedPlayModeIndex == -1) {
        this.selectedPlayModeIndex = 0;
      }
    },
  },
  computed: {
    selectedPlayMode() {
      return this.playModes[this.selectedPlayModeIndex];
    },
  },
  created() {
    this.selectPlayMode();
  },
};
</script>
