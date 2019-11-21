<template>
  <v-container>
    <Startup />
    <Games />
    <Accounts />
    <Platforms />
  </v-container>
</template>

<script>
import Startup from "@/components/Startup.vue";
import Games from "@/components/Games.vue";
import Accounts from "@/components/Accounts.vue";
import Platforms from "@/components/Platforms.vue";

export default {
  components: {
    Startup,
    Games,
    Accounts,
    Platforms
  }
};
</script>
