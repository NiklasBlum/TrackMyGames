<template>
  <v-form v-model="isValid">
    <v-text-field
      solo-inverted
      label="yours@example.com"
      prepend-inner-icon="mdi-account"
      v-model="email"
      required
      :rules="emailRules"
    />
    <v-text-field
      solo-inverted
      label="your password"
      prepend-inner-icon="mdi-lock"
      v-model="password"
      type="password"
      required
      :rules="passwordRules"
    />
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      isValid: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 6) || "Password must be more than 6 characters",
      ],
    };
  },
  methods: {
    emitChanges() {
      this.$emit("inputChanged", {
        email: this.email,
        password: this.password,
        isValid: this.isValid,
      });
    },
  },
  watch: {
    isValid() {
      this.emitChanges();
    },
    email() {
      this.emitChanges();
    },
    password() {
      this.emitChanges();
    },
  },
};
</script>

<style>
</style>