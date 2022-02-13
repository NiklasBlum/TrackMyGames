<template>
  <v-tooltip v-if="this.platform" left color="primary">
    <template v-slot:activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on">
        <v-icon size="30">{{ platform.icon }}</v-icon>
      </span>
    </template>
    <span>{{ platform.name }}</span>
  </v-tooltip>
  <div v-else class="red--text">not found!</div>
</template>

<script>
import { mapState } from "vuex";
import { Platform } from "@/models/dbModels.js";
export default {
  data() {
    return {
      platform: new Platform(),
    };
  },
  props: {
    platformId: String,
  },
  methods: {
    getPlatform() {
      this.platform = this.platforms.find((platform) => {
        return platform.id == this.platformId;
      });
    },
  },
  created() {
    this.getPlatform();
  },
  computed: {
    ...mapState(["platforms"]),
  },
  watch: {
    platformId() {
      this.getPlatform();
    },
  },
};
</script>