<template>
  <v-container>
    <v-list>
      <v-subheader>
        Platforms
        <v-spacer />
        <v-btn icon>
          <v-icon @click="createPlatform">mdi-plus</v-icon>
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
              <v-icon @click="editPlatform(platform)">mdi-pencil</v-icon>
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
      v-model="showDialog"
      persistent
      max-width="500px"
      @keydown.esc="this.showDialog = false"
      @keydown.enter="savePlatform(editedItem)"
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
              <v-col cols="12" sm="6">
                <v-text-field label="Icon" v-model="editedItem.icon" />
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
            @click="savePlatform(editedItem)"
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
import FirestoreService from "@/services/FirestoreService.js";
import { Platform, EditMode } from "@/models/dbModels.js";

export default {
  data() {
    return {
      dialogMode: EditMode.new,
      showDialog: false,
      editedItem: new Platform(),
      defaultItem: new Platform(),
    };
  },
  methods: {
    createPlatform() {
      this.dialogMode = EditMode.new;

      this.showDialog = true;
    },
    async savePlatform(platform) {
      console.log(platform);
      if (this.dialogMode == EditMode.edit) {
        await FirestoreService.updatePlatform(platform);
      } else {
        await FirestoreService.addPlatform(platform);
      }
      this.platforms = await FirestoreService.getDocuments("platform");
      this.closeDialog();
    },
    editPlatform(platform) {
      this.dialogMode = EditMode.edit;
      this.editedIndex = this.platforms.indexOf(platform);
      this.editedItem = Object.assign({}, platform);
      this.showDialog = true;
    },
    async deletePlatform(id) {
      await FirestoreService.deletePlatform(id);
      this.platforms = this.platforms.filter((platform) => {
        return platform.id != id;
      });
    },
    closeDialog() {
      this.showDialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, new Platform());
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
      return this.dialogMode == EditMode.new
        ? "New Platform"
        : "Update Platform";
    },
    platforms: {
      get() {
        return this.$store.state.platforms;
      },
      set(platforms) {
        this.$store.commit("setPlatforms", platforms);
      },
    },
  },
};
</script>
