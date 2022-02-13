<template>
  <v-icon size="30" v-if="this.platform">{{ this.platform.icon }}</v-icon>
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
};
</script>