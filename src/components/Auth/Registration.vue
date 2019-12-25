<template>
  <v-card>
    <v-card-title>Create Account</v-card-title>
    <v-card-text>
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
    </v-card-text>
    <v-card-actions>
      <v-btn block @click="register()">Create Account</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from "firebase/app";
export default {
  data() {
    return {
      email: null,
      password: null,
      isValid: false
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
