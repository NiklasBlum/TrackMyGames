<template>
  <div>
    <v-data-table
      :dense="isDense"
      :headers="tableHeaders"
      :items="games"
      :sort-by="'gameStateId'"
      :items-per-page="15"
      :footer-props="{
        'items-per-page-options': [10, 15, 20, 30, 40, 50],
      }"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ games.length }} Games</v-toolbar-title>
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            clearable
            @focus="quickActionEnabled = false"
            @blur="quickActionEnabled = true"
          />
          <v-spacer />
          <v-btn icon @click="isDense = !isDense" class="d-none d-sm-flex">
            <v-icon size="30">
              {{
                isDense == true
                  ? "mdi-arrow-expand-vertical"
                  : "mdi-arrow-collapse-vertical"
              }}</v-icon
            >
          </v-btn>
          <v-btn large icon @click="openDialog">
            <v-icon size="35">mdi-plus-circle</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.name="{ item }">
        <h2 class="">{{ item.name }}</h2>
      </template>
      <template v-slot:item.platformId="{ item }">
        <PlatformIcon v-if="item.platformId" :platformId="item.platformId" />
      </template>
      <template v-slot:item.accountId="{ item }">
        <AccountName v-if="item.accountId" :accountId="item.accountId" />
      </template>
      <template v-slot:item.gameStateId="{ item }">
        <GameStateInfo
          v-if="item.gameStateId"
          :gameStateId="item.gameStateId"
        />
      </template>
      <template v-slot:item.editedAt="{ item }">
        {{ item.editedAt.toDate().toLocaleDateString("de-DE") }}
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon class="mr-2" @click="editGame(item)"> mdi-file-edit </v-icon>
        <v-icon @click="deleteGame(item.id)">mdi-delete-forever</v-icon>
      </template>
    </v-data-table>

    <GameEditDialog
      :showDialog="showDialog"
      :gameItem="gameItem"
      @saved="saveGame"
      @closed="closeDialog"
    />
  </div>
</template>

<script>
import FirestoreService from "@/services/FirestoreService.js";
import { Game } from "@/models/dbModels.js";
import { DialogMode } from "@/models/localModels.js";
import GameEditDialog from "@/components/Game/Dialogs/GameEditDialog.vue";
import PlatformIcon from "@/components/Platform/PlatformIcon.vue";
import AccountName from "@/components/Account/AccountName.vue";
import GameStateInfo from "@/components/Game/GameStateInfo.vue";
import { mapState } from "vuex";

export default {
  components: {
    GameEditDialog,
    PlatformIcon,
    AccountName,
    GameStateInfo,
  },
  data() {
    return {
      tableHeaders: [
        { text: "Game", align: "left", value: "name" },
        { text: "Platform", value: "platformId" },
        { text: "Account", value: "accountId" },
        { text: "GameState", value: "gameStateId" },
        { text: "EditedAt", value: "editedAt" },
        { text: "Actions", value: "action", sortable: false },
      ],
      dialogMode: DialogMode.new,
      isDense: true,
      search: "",
      showDialog: false,
      gameItem: new Game(),
      quickActionEnabled: true,
    };
  },
  computed: {
    ...mapState(["platforms", "accounts", "gameStateInfos", "currentView"]),
    games: {
      get() {
        return this.$store.state.games;
      },
      set(games) {
        this.$store.commit("setGames", games);
      },
    },
  },
  methods: {
    openDialog() {
      this.dialogMode = DialogMode.new;
      this.showDialog = true;
    },
    async saveGame(game) {
      if (this.dialogMode == DialogMode.edit) {
        await FirestoreService.updateGame(game);
      } else {
        await FirestoreService.addGame(game);
      }
      this.closeDialog();
      this.games = await FirestoreService.getDocuments("games");
    },
    editGame(game) {
      this.dialogMode = DialogMode.edit;
      this.gameItem = Object.assign({}, game);
      this.showDialog = true;
    },
    async deleteGame(id) {
      await FirestoreService.deleteDocument("games", id);
      this.games = this.games.filter((game) => {
        return game.id != id;
      });
    },
    closeDialog() {
      this.showDialog = false;
      this.gameItem = new Game();
    },
  },
  mounted() {
    window.addEventListener("keypress", (e) => {
      if (e.key == "n" && this.quickActionEnabled && this.currentView == 0) {
        this.openDialog();
      }
    });
  },
  beforeDestroy() {
    console.log("Destroy");
    window.removeEventListener("keypress");
  },
};
</script>
