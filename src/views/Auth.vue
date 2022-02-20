<template>
  <v-container fluid fill-height>
    <v-row class="fill-height" align="center">
      <v-col class="d-none d-md-block blue fill-height" md="7"> </v-col>
      <v-col cols="12" md="5">
        <v-row justify="center">
          <v-col cols="11" sm="8" md="10">
            <v-card>
              <v-card-title class="primary">
                <v-row class="text-center" justify="center" align="center">
                  <v-col align-self="center" justify-self="center">
                    <v-icon x-large>mdi-google-controller</v-icon>
                    TrackMyGames
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-tabs v-model="tabs" centered>
                  <v-tab> Login </v-tab>
                  <v-tab> Register </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tabs">
                  <v-tab-item>
                    <Login />
                  </v-tab-item>
                  <v-tab-item>
                    <Registration />
                  </v-tab-item>
                </v-tabs-items>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Login from "@/components/Auth/Login.vue";
import Registration from "@/components/Auth/Registration.vue";
export default {
  components: {
    Login,
    Registration,
  },
  data() {
    return {
      tabs: null,
    };
  },
};
</script>

<style scoped>
.container {
  padding: 0;
}
</style>