<template>
  <div>
    <v-list>
      <v-subheader class="blue">
        {{ platforms.length }} Platforms
        <v-spacer />
        <v-btn icon>
          <v-icon @click="openDialog">mdi-plus</v-icon>
        </v-btn>
      </v-subheader>
      <v-list-item v-for="platform in platforms" :key="platform.id">
        <v-list-item-icon>
          <v-icon size="40" v-text="platform.icon" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="platform.name" />
          <v-list-item-subtitle
            v-text="platform.createdAt.toDate().toLocaleDateString('de-DE')"
          />
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
      @keydown.enter="savePlatform(platformItem)"
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
                  v-model="platformItem.name"
                  autofocus
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Icon" v-model="platformItem.icon" />
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
            @click="savePlatform(platformItem)"
            :disabled="!isSavingValid"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FirestoreService from "@/services/FirestoreService.js";
import { Platform } from "@/models/dbModels.js";
import { DialogMode } from "@/models/localModels.js";

export default {
  data() {
    return {
      dialogMode: DialogMode.new,
      showDialog: false,
      platformItem: new Platform(),
    };
  },
  methods: {
    openDialog() {
      this.dialogMode = DialogMode.new;
      this.showDialog = true;
    },
    async savePlatform(platform) {
      if (this.dialogMode == DialogMode.edit) {
        await FirestoreService.updatePlatform(platform);
      } else {
        await FirestoreService.addPlatform(platform);
      }
      this.platforms = await FirestoreService.getDocuments("platforms");
      this.closeDialog();
    },
    editPlatform(platform) {
      this.dialogMode = DialogMode.edit;
      this.platformItem = Object.assign({}, platform);
      this.showDialog = true;
    },
    async deletePlatform(id) {
      await FirestoreService.deleteDocument("platforms", id);
      this.platforms = this.platforms.filter((platform) => {
        return platform.id != id;
      });
    },
    closeDialog() {
      this.showDialog = false;
      setTimeout(() => {
        this.platformItem = Object.assign({}, new Platform());
      }, 50);
    },
  },
  computed: {
    isSavingValid() {
      if (this.platformItem.name == undefined || this.platformItem.name == "") {
        return false;
      }
      return true;
    },
    formTitle() {
      return this.dialogMode == DialogMode.new
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
