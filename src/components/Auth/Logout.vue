<template>
  <v-btn @click="logout">Logout</v-btn>
</template>

<script>
import firebase from "firebase/app";

export default {
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("auth");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
