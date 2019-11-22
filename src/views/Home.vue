<template>
  <v-container>
    <Startup />
    <v-layout row>
      <v-flex xs12><Games /> </v-flex>
      <v-flex xs6> <Accounts /></v-flex>
      <v-flex xs6> <Platforms /></v-flex>
    </v-layout>
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
