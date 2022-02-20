<template>
  <div class="mt-6">
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
    <v-divider class="my-7" />
    <v-row>
      <v-col cols="12">
        <EmailForm @inputChanged="emailFormChanged" />
      </v-col>
      <v-col cols="12">
        <v-btn
          block
          :disabled="!isEmailFormValid"
          :loading="loading"
          @click="signInWithEmail"
          color="success"
        >
          Sign in <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    {{ this.error }}
  </div>
</template>

<script>
import firebase from "firebase/app";
import EmailForm from "@/components/Auth/EmailForm.vue";
export default {
  components: {
    EmailForm,
  },
  data() {
    return {
      email: null,
      password: null,
      loading: false,
      isEmailFormValid: false,
      error: null,
    };
  },
  methods: {
    emailFormChanged(event) {
      this.email = event.email;
      this.password = event.password;
      this.isEmailFormValid = event.isValid;
    },
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
          console.log(err.message);
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
