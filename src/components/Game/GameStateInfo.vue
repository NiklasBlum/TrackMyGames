<template>
  <div v-if="this.gameStateInfo">
    <v-icon size="30" :color="this.gameStateInfo.color">
      {{ this.gameStateInfo.icon }}
    </v-icon>
    {{ this.gameStateInfo.title }}
  </div>
  <div v-else class="red--text">not found!</div>
</template>

<script>
import { mapState } from "vuex";
import { GameStateInfo } from "@/models/localModels.js";
export default {
  data() {
    return {
      gameStateInfo: new GameStateInfo(),
    };
  },
  props: {
    gameStateId: String,
  },
  methods: {
    getGameStateInfo() {
      this.gameStateInfo = this.gameStateInfos.find((info) => {
        return info.id == this.gameStateId;
      });
    },
  },
  created() {
    this.getGameStateInfo();
  },
  computed: {
    ...mapState(["gameStateInfos"]),
  },
  watch: {
    gameStateId() {
      this.getGameStateInfo();
    },
  },
};
</script>