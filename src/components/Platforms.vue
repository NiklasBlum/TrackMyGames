<template>
  <v-container>
    <v-list>
      <v-subheader>
        Platforms
        <v-spacer />
        <v-btn icon>
          <v-icon @click="dialog = true">mdi-plus</v-icon>
        </v-btn>
      </v-subheader>
      <v-list-item v-for="platform in platforms" :key="platform.id">
        <v-list-item-icon>
          <v-icon v-text="platform.icon" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="platform.name" />
        </v-list-item-content>
        <v-list-item-action>
          <v-row>
            <v-btn icon>
              <v-icon @click="editAlbum(platform)">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon @click="deletePlatform(platform.id)">mdi-delete</v-icon>
            </v-btn>
          </v-row>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <!-- PopUpDialog -->
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500px"
      @keydown.esc="dialog = false"
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
                  v-model="editedItem.name"
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
            @click="savePlatform()"
            :disabled="isSavingValid"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import db from "@/firebase/config";

export default {
  data() {
    return {
      dialog: false,
      editedIndex: -1,
      editedItem: {
        name: "",
      },
      defaultItem: {
        name: "",
      },
    };
  },
  methods: {
    savePlatform() {
      //method to update platform
      if (this.editedIndex > -1) {
        //Update exisiting item
        db.collection("platform").doc(this.editedItem.id).update({
          name: this.editedItem.name,
        });
        this.platforms.splice(this.editedIndex, 1, this.editedItem);
      } else {
        //Create new Item
        db.collection("platform")
          .add({
            name: this.editedItem.name,
          })
          .then((response) => {
            var newPlatform = { name: this.editedItem.name, id: response.id };
            this.platforms.push(newPlatform);
          });
      }
      this.closeDialog();
    },
    deletePlatform(id) {
      db.collection("platform")
        .doc(id)
        .delete()
        .then(() => {
          this.platforms = this.platforms.filter((platform) => {
            return platform.id != id;
          });
        });
    },
    editAlbum(platform) {
      this.editedIndex = this.platforms.indexOf(platform);
      this.editedItem = Object.assign({}, platform);
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
      if (this.editedItem.name != "") {
        return false;
      } else return true;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Platform" : "Update Platform";
    },
    platforms: {
      get() {
        return this.$store.state.platforms;
      },
      set(platforms) {
        this.$store.commit("setPlatforms", platforms);
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
