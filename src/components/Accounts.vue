<template>
  <v-container>
    <v-list>
      <v-subheader>
        {{ accounts.length }} Accounts
        <v-spacer />
        <v-btn icon>
          <v-icon @click="openDialog">mdi-plus</v-icon>
        </v-btn>
      </v-subheader>
      <v-list-item v-for="account in accounts" :key="account.id">
        <v-list-item-content>
          <v-list-item-title v-text="account.name" />
          <v-list-item-subtitle
            v-text="account.createdAt.toDate().toLocaleDateString('de-DE')"
          />
        </v-list-item-content>
        <v-list-item-action>
          <v-row>
            <v-btn icon>
              <v-icon @click="editAccount(account)">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon @click="deleteAccount(account.id)">mdi-delete</v-icon>
            </v-btn>
          </v-row>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <!-- PopUpDialog -->
    <v-dialog
      v-model="showDialog"
      persistent
      max-width="500px"
      @keydown.esc="this.showDialog = false"
      @keydown.enter="saveAccount(accountItem)"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Name"
                  v-model="accountItem.name"
                  autofocus
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="closeDialog()">
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="saveAccount(accountItem)"
            :disabled="!isSavingValid"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import FirestoreService from "@/services/FirestoreService.js";
import { Account, EditMode } from "@/models/dbModels.js";

export default {
  data() {
    return {
      dialogMode: EditMode.new,
      showDialog: false,
      accountItem: new Account(),
    };
  },
  methods: {
    openDialog() {
      this.dialogMode = EditMode.new;
      this.showDialog = true;
    },
    async saveAccount(account) {
      if (this.dialogMode == EditMode.edit) {
        await FirestoreService.updateAccount(account);
      } else {
        await FirestoreService.addAccount(account);
      }
      this.accounts = await FirestoreService.getDocuments("accounts");
      this.closeDialog();
    },
    editAccount(account) {
      this.dialogMode = EditMode.edit;
      this.accountItem = Object.assign({}, account);
      this.showDialog = true;
    },
    async deleteAccount(id) {
      await FirestoreService.deleteAccount(id);
      this.accounts = this.accounts.filter((account) => {
        return account.id != id;
      });
    },
    closeDialog() {
      this.showDialog = false;
      setTimeout(() => {
        this.accountItem = Object.assign({}, new Account());
      }, 50);
    },
  },
  computed: {
    isSavingValid() {
      if (this.accountItem.name == undefined || this.accountItem.name == "") {
        return false;
      }
      return true;
    },
    formTitle() {
      return this.dialogMode == EditMode.new ? "New Account" : "Update Account";
    },
    accounts: {
      get() {
        return this.$store.state.accounts;
      },
      set(accounts) {
        this.$store.commit("setAccounts", accounts);
      },
    },
  },
};
</script>
