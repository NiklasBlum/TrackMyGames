<template>
  <div>
    <v-data-table
      :dense="isDense"
      :headers="tableHeaders"
      :items="games"
      :items-per-page="15"
      :search="search"
      ><template v-slot:top>
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
          />
          <v-spacer />
          <v-btn icon @click="isDense = !isDense">
            <v-icon>mdi-minus-circle-outline</v-icon>
          </v-btn>
          <v-btn large icon @click="openDialog">
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.platformId="{ item }">
        <PlatformIcon v-if="item.platformId" :platformId="item.platformId" />
      </template>
      <template v-slot:item.accountId="{ item }">
        <AccountName v-if="item.accountId" :accountId="item.accountId" />
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon class="mr-2" @click="editGame(item)">mdi-pencil</v-icon>
        <v-icon @click="deleteGame(item.id)">mdi-delete</v-icon>
      </template>
      <template v-slot:item.gameState="{ item }">
        <v-icon
          size="30"
          :color="
            gameStateInfos.find((x) => x.gameState == item.gameState).color
          "
        >
          {{ gameStateInfos.find((x) => x.gameState == item.gameState).icon }}
        </v-icon>
        {{ gameStateInfos.find((x) => x.gameState == item.gameState).title }}
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
import GameEditDialog from "@/components/dialogs/GameEditDialog.vue";
import PlatformIcon from "@/components/PlatformIcon.vue";
import AccountName from "@/components/AccountName.vue";
import { mapState } from "vuex";
export default {
  components: {
    GameEditDialog,
    PlatformIcon,
    AccountName,
  },
  data() {
    return {
      tableHeaders: [
        { text: "Game", align: "left", value: "name" },
        { text: "Platform", value: "platformId" },
        { text: "Account", value: "accountId" },
        { text: "GameState", value: "gameState" },
        { text: "Actions", value: "action", sortable: false },
      ],
      dialogMode: DialogMode.new,
      isDense: false,
      search: "",
      showDialog: false,
      gameItem: new Game(),
    };
  },
  computed: {
    ...mapState(["platforms", "accounts", "gameStateInfos"]),
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
};
</script>
