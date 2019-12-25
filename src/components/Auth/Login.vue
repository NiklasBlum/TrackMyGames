<template>
  <v-card color="blue">
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-expansion-panels multiple>
        <v-expansion-panel>
          <v-expansion-panel-header>Social Login</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row align="center" justify="center">
              <v-col cols="12">
                <v-btn large color="red" @click="signInWithGoogle()">
                  <v-icon left>mdi-google</v-icon>
                  Sign in With Google
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn large color="blue">
                  <v-icon>mdi-facebook</v-icon>
                  Sign In With Facebook
                </v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            With Email
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form>
              <v-text-field
                label="Email"
                v-model="email"
                required
                :rules="[v => !!v || 'Email is required']"
              />
              <v-text-field
                label="Password"
                v-model="password"
                type="password"
                required
                :rules="[v => !!v || 'Password is required']"
              />
            </v-form>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
    <v-card-actions>
      <v-btn block :loading="loading" @click="signIn">Login</v-btn>
    </v-card-actions>
    <v-alert type="error" v-if="error">
      {{ error }}
    </v-alert>
  </v-card>
</template>

<script>
import firebase from "firebase/app";

export default {
  data() {
    return {
      loading: false,
      email: null,
      password: null,
      isValid: false,
      error: null
    };
  },
  methods: {
    signIn() {
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("/");
          this.email = null;
          this.password = null;
        })
        .catch(err => {
          this.error = err.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$router.replace("/");
        });
    }
  }
};
</script>
