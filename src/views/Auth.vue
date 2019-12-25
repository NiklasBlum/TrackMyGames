<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-row justify="center" align="center">
          <v-col align-self="center" justify-self="center">
            <v-icon x-large>mdi-google-controller</v-icon>
            TrackMyGames
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-tabs v-model="tabs" centered>
          <v-tab href="#login"> Login </v-tab>
          <v-tab disabled href="#register"> Register </v-tab>
        </v-tabs>
        <Login class="mb-3" v-show="tabs == 'login'" />
        <Registration class="mb-3" v-show="tabs == 'register'" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Login from "@/components/Auth/Login.vue";
import Registration from "@/components/Auth/Registration.vue";
export default {
  components: {
    Login,
    Registration
  },
  data() {
    return {
      tabs: "login"
    };
  }
};
</script>
