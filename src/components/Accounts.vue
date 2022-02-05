<template>
  <v-container>
    <v-list>
      <v-subheader>
        Accounts
        <v-spacer />
        <v-btn icon>
          <v-icon @click="dialog = true">mdi-plus</v-icon>
        </v-btn>
      </v-subheader>
      <v-list-item v-for="album in albums" :key="album.id">
        <v-list-item-content>
          <v-list-item-title v-text="album.Name"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-layout row>
            <v-btn icon>
              <v-icon @click="editAlbum(album)">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon @click="deleteAlbum(album.id)">mdi-delete</v-icon>
            </v-btn>
          </v-layout>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <!-- PopUpDialog -->
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
      @keydown.esc="dialog = false"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Name"
                  v-model="editedItem.Name"
                  autofocus
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="closeDialog()"
            >Cancel</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            @click="saveAlbum()"
            :disabled="isSavingValid"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { firestore } from "@/firebase/config";

export default {
  data() {
    return {
      dialog: false,
      editedIndex: -1,
      editedItem: {
        Name: "",
      },
      defaultItem: {
        Name: "",
      },
    };
  },
  methods: {
    saveAlbum() {
      if (this.editedIndex > -1) {
        //Update exisiting item
        firestore
          .collection("users")
          .doc(this.user.uid)
          .collection("accounts")
          .doc(this.editedItem.id)
          .update({
            Name: this.editedItem.Name,
          });
        this.albums.splice(this.editedIndex, 1, this.editedItem);
      } else {
        //Create new Item
        firestore
          .collection("users")
          .doc(this.user.uid)
          .collection("accounts")
          .add({
            Name: this.editedItem.Name,
          })
          .then((response) => {
            var newAlbum = { Name: this.editedItem.Name, id: response.id };
            this.albums.push(newAlbum);
          });
      }
      this.closeDialog();
    },
    deleteAlbum(id) {
      firestore
        .collection("users")
        .doc(this.user.uid)
        .collection("accounts")
        .doc(id)
        .delete()
        .then(() => {
          this.albums = this.albums.filter((Album) => {
            return Album.id != id;
          });
        });
    },
    editAlbum(Album) {
      this.editedIndex = this.albums.indexOf(Album);
      this.editedItem = Object.assign({}, Album);
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
  },
  computed: {
    isSavingValid() {
      if (this.editedItem.Name != "") {
        return false;
      } else return true;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Album" : "Update Album";
    },
    albums: {
      get() {
        return this.$store.state.accounts;
      },
      set(accounts) {
        this.$store.commit("setAccounts", accounts);
      },
    },
    user: {
      get() {
        return this.$store.state.user;
      },
    },
  },
};
</script>
