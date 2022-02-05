<template>
  <v-data-table
    :dense="isDense"
    :headers="headers"
    :items="games"
    :items-per-page="15"
    :search="search"
    sort-by="Finished"
    ><template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>My Games</v-toolbar-title>
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
        <v-dialog v-model="showDialog" max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn large icon class="mb-1" v-on="on">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="gameItem.name"
                      label="Game Name"
                      autofocus
                      clearable
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="gameItem.platform"
                      :items="platforms"
                      item-text="name"
                      label="Platforms"
                      clearable
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="gameItem.account"
                      :items="accounts"
                      item-text="name"
                      label="Accounts"
                      clearable
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-switch
                      dense
                      v-model="gameItem.isFinished"
                      label="Finished"
                      color="green"
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
                @click="saveGame(gameItem)"
                :disabled="isSavingValid"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      <v-icon small class="mr-2" @click="editGame(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteGame(item.id)"> mdi-delete </v-icon>
    </template>
    <template v-slot:item.isFinished="{ item }">
      <v-icon color="success" v-if="item.isFinished">mdi-check-all</v-icon>
      <v-icon color="error" v-if="!item.isFinished">mdi-cancel</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import FirestoreService from "@/services/FirestoreService.js";
import { Game, EditMode } from "@/models/dbModels.js";
export default {
  data() {
    return {
      headers: [
        { text: "Game", align: "left", value: "name" },
        { text: "Platform", value: "platform" },
        { text: "Account", value: "account" },
        { text: "Finished", value: "isFinished" },
        { text: "Actions", value: "action", sortable: false },
      ],
      dialogMode: EditMode.new,
      isDense: false,
      search: "",
      showDialog: false,
      gameItem: new Game(),
    };
  },
  computed: {
    formTitle() {
      return this.dialogMode == EditMode.new ? "New Game" : "Edit Game";
    },
    games: {
      get() {
        return this.$store.state.games;
      },
      set(games) {
        this.$store.commit("setGames", games);
      },
    },
    platforms: {
      get() {
        return this.$store.state.platforms;
      },
    },
    accounts: {
      get() {
        return this.$store.state.accounts;
      },
    },
    isSavingValid() {
      if (this.gameItem.name != "" && this.gameItem.name != undefined) {
        return false;
      } else return true;
    },
  },
  methods: {
    openDialog() {
      this.dialogMode = EditMode.new;
      this.showDialog = true;
    },
    async saveGame(game) {
      console.log(game);
      if (this.dialogMode == EditMode.edit) {
        await FirestoreService.updateGame(game);
      } else {
        await FirestoreService.addGame(game);
      }
      this.games = await FirestoreService.getDocuments("games");
      this.closeDialog();
    },
    editGame(game) {
      this.dialogMode = EditMode.edit;
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
      setTimeout(() => {
        this.gameItem = Object.assign({}, new Game());
      }, 50);
    },
  },
};
</script>
