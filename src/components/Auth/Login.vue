<template>
  <v-card color="secondary">
    <v-card-text>
      <v-row class="text-center" align="center" justify="center">
        <v-col cols="12">
          <v-btn block large color="red" @click="signInWithGoogle()">
            <v-icon left>mdi-google</v-icon>
            Sign in With Google
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block large color="blue" @click="signInWithFacebook()">
            <v-icon left>mdi-facebook</v-icon>
            Sign In With Facebook
          </v-btn>
        </v-col>
      </v-row>
      <v-divider class="mt-5">inset</v-divider>
      <v-row class="mt-3">
        <v-col>
          <v-form>
            <v-text-field
              solo-inverted
              label="yours@example.com"
              prepend-inner-icon="mdi-account"
              v-model="email"
              required
              :rules="[(v) => !!v || 'Email is required']"
            />
            <v-text-field
              solo-inverted
              label="your password"
              prepend-inner-icon="mdi-lock"
              v-model="password"
              type="password"
              required
              :rules="[(v) => !!v || 'Password is required']"
            />
          </v-form>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn block :loading="loading" @click="signInWithEmail">
        Sign in <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
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
      error: null,
    };
  },
  methods: {
    signInWithEmail() {
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("/");
          this.email = null;
          this.password = null;
        })
        .catch((err) => {
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
    },
    signInWithFacebook() {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$router.replace("/");
        });
    },
  },
};
</script>
