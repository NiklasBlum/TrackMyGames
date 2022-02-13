<template>
  <div v-if="this.account">{{ this.account.name }}</div>
  <div v-else class="red--text">not found!</div>
</template>

<script>
import { mapState } from "vuex";
import { Account } from "@/models/dbModels.js";
export default {
  data() {
    return {
      account: new Account(),
    };
  },
  props: {
    accountId: String,
  },
  methods: {
    getAccount() {
      this.account = this.accounts.find((account) => {
        return account.id == this.accountId;
      });
    },
  },
  created() {
    this.getAccount();
  },
  computed: {
    ...mapState(["accounts"]),
  },
};
</script>