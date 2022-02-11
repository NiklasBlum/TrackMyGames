<template>
  <v-list>
    <v-list-item-group v-model="selectedPlayModeIndex" mandatory>
      <v-list-item
        v-for="playMode in this.playModes"
        :key="playMode.title"
        @click="setPlayMode(playMode)"
      >
        <v-list-item-icon>
          <v-icon size="30" :color="playMode.color" v-text="playMode.icon" />
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
import { mapState } from "vuex";
export default {
  props: {
    playType: String,
  },
  data() {
    return {
      selectedPlayModeIndex: null,
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
    ...mapState(["playModes"]),
    selectedPlayMode() {
      return this.playModes[this.selectedPlayModeIndex];
    },
  },
  created() {
    this.selectPlayMode();
  },
};
</script>
