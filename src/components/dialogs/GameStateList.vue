<template>
  <v-card outlined class="blue" elevation="5">
    <v-card-title> GameState </v-card-title>
    <v-card-subtitle>Select a GameState</v-card-subtitle>
    <v-list>
      <v-list-item-group v-model="selectedGameStateInfoIndex" mandatory>
        <v-list-item
          v-for="gameStateInfo in this.gameStateInfos"
          :key="gameStateInfo.id"
          @click="emitGameState(gameStateInfo.id)"
        >
          <v-list-item-icon>
            <v-icon
              size="40"
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
  </v-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    gameStateId: String,
  },
  data() {
    return {
      selectedGameStateInfoIndex: null,
    };
  },
  methods: {
    emitGameState(id) {
      this.$emit("gameStateIdChanged", id);
    },
    selectGameStateInfo() {
      this.selectedGameStateInfoIndex = this.gameStateInfos.findIndex(
        (item) => item.id === this.gameStateId
      );
      if (this.selectedGameStateInfoIndex == -1) {
        this.selectedGameStateInfoIndex = 0;
      }
      this.emitGameState(
        this.gameStateInfos[this.selectedGameStateInfoIndex].id
      );
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

<style scoped>
.v-list {
  padding: 0;
}
</style>
