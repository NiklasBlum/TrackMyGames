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
      <template v-slot:item.platform="{ item }">
        <v-icon v-if="item.platform == ''" size="30">mdi-content-save</v-icon>
        <v-icon v-if="item.platform == 'Steam'" size="30"> mdi-steam</v-icon>
        <v-icon v-if="item.platform == 'Origin'" size="30">mdi-origin</v-icon>
        <v-icon v-if="item.platform == 'GOG.com'" size="30">mdi-gog</v-icon>
        <v-icon v-if="item.platform == 'Uplay'" size="30">mdi-ubisoft</v-icon>
        <v-icon v-if="item.platform == 'Microsoft Store'" size="30">
          mdi-microsoft-windows
        </v-icon>
        <v-img
          v-if="item.platform == 'Epic Store'"
          width="30px"
          src="https://cdn2.unrealengine.com/Unreal+Engine%2Feg-logo-filled-1255x1272-0eb9d144a0f981d1cbaaa1eb957de7a3207b31bb.png"
        />
        <v-img
          v-if="item.platform == 'Rockstar Social Club'"
          width="30px"
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7decb34c-f63b-4f93-81f1-7e03ea28b30f/ddqoj2v-ba0f9356-6ed9-4e67-972b-3a31829aada0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdkZWNiMzRjLWY2M2ItNGY5My04MWYxLTdlMDNlYTI4YjMwZlwvZGRxb2oydi1iYTBmOTM1Ni02ZWQ5LTRlNjctOTcyYi0zYTMxODI5YWFkYTAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-iwIgb9LWxJq211Ikl79rKFsYSHc0X7p09Evy35e_Uk"
        />
        <v-img
          v-if="item.platform == 'Riot Games'"
          width="30px"
          src="https://styles.redditmedia.com/t5_2tavq/styles/communityIcon_rhpcgbf8rvs21.png"
        />
        <v-img
          v-if="item.platform == 'Blizzard Launcher'"
          width="30px"
          contain
          src="../assets/blizzard.png"
        />
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

    <EditGameDialog
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
import EditGameDialog from "@/components/dialogs/EditGameDialog.vue";
import { mapState } from "vuex";
export default {
  components: {
    EditGameDialog,
  },
  data() {
    return {
      tableHeaders: [
        { text: "Game", align: "left", value: "name" },
        { text: "Platform", value: "platform" },
        { text: "Account", value: "account" },
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
      await FirestoreService.deleteGame(id);
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
