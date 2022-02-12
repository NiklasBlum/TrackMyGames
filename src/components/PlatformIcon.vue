<template>
  <v-icon size="30">{{ this.platform.icon }}</v-icon>
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