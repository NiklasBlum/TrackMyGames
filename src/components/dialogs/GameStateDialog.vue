<template>
  <v-list>
    <v-list-item-group v-model="selectedGameStateInfoIndex" mandatory>
      <v-list-item
        v-for="gameStateInfo in this.gameStateInfos"
        :key="gameStateInfo.title"
        @click="emitGameState(gameStateInfo.gameState)"
      >
        <v-list-item-icon>
          <v-icon
            size="30"
            :color="gameStateInfo.color"
            v-text="gameStateInfo.icon"
          />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="gameStateInfo.title" />
          <v-list-item-subtitle v-text="gameStateInfo.description" />
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    gameState: String,
  },
  data() {
    return {
      selectedGameStateInfoIndex: null,
    };
  },
  methods: {
    emitGameState(gameState) {
      this.$emit("gameStateChanged", gameState);
    },
    selectGameStateInfo() {
      this.selectedGameStateInfoIndex = this.gameStateInfos.findIndex(
        (object) => {
          return object.gameState === this.gameState;
        }
      );
      if (this.selectedGameStateInfoIndex == -1) {
        this.selectedGameStateInfoIndex = 0;
      }
    },
  },
  computed: {
    ...mapState(["gameStateInfos"]),
  },
  created() {
    this.selectGameStateInfo();
  },
};
</script>
