<template>
  <div class="mt-6">
    <v-row>
      <v-col cols="12">
        <EmailForm @inputChanged="emailFormChanged" />
      </v-col>
    </v-row>
    <v-col cols="12">
      <v-btn block :disabled="!isValid" @click="register()" color="success">
        Create Account
      </v-btn>
    </v-col>
  </div>
</template>

<script>
import firebase from "firebase/app";
import EmailForm from "@/components/Auth/EmailForm";
export default {
  components: {
    EmailForm,
  },
  data() {
    return {
      email: null,
      password: null,
      isValid: false,
    };
  },
  methods: {
    emailFormChanged(event) {
      this.email = event.email;
      this.password = event.password;
      this.isValid = event.isValid;
    },
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
