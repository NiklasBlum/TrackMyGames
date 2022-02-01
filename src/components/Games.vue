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
        <v-dialog v-model="dialog" max-width="600px">
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
                      v-model="editedItem.Name"
                      label="Game Name"
                      autofocus
                      clearable
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="editedItem.Platform"
                      :items="platforms"
                      item-text="Name"
                      label="Platforms"
                      clearable
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="editedItem.Account"
                      :items="accounts"
                      item-text="Name"
                      label="Accounts"
                      clearable
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-switch
                      dense
                      v-model="editedItem.Finished"
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
                @click="saveSong()"
                :disabled="isSavingValid"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.Platform="{ item }">
      <v-icon v-if="item.Platform == ''" size="30">mdi-content-save</v-icon>
      <v-icon v-if="item.Platform == 'Steam'" size="30"> mdi-steam</v-icon>
      <v-icon v-if="item.Platform == 'Origin'" size="30">mdi-origin</v-icon>
      <v-icon v-if="item.Platform == 'GOG.com'" size="30">mdi-gog</v-icon>
      <v-icon v-if="item.Platform == 'Uplay'" size="30">mdi-ubisoft</v-icon>
      <v-icon v-if="item.Platform == 'Microsoft Store'" size="30">
        mdi-microsoft-windows
      </v-icon>
      <v-img
        v-if="item.Platform == 'Epic Store'"
        width="30px"
        src="https://cdn2.unrealengine.com/Unreal+Engine%2Feg-logo-filled-1255x1272-0eb9d144a0f981d1cbaaa1eb957de7a3207b31bb.png"
      />
      <v-img
        v-if="item.Platform == 'Rockstar Social Club'"
        width="30px"
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7decb34c-f63b-4f93-81f1-7e03ea28b30f/ddqoj2v-ba0f9356-6ed9-4e67-972b-3a31829aada0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdkZWNiMzRjLWY2M2ItNGY5My04MWYxLTdlMDNlYTI4YjMwZlwvZGRxb2oydi1iYTBmOTM1Ni02ZWQ5LTRlNjctOTcyYi0zYTMxODI5YWFkYTAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-iwIgb9LWxJq211Ikl79rKFsYSHc0X7p09Evy35e_Uk"
      />
      <v-img
        v-if="item.Platform == 'Riot Games'"
        width="30px"
        src="https://styles.redditmedia.com/t5_2tavq/styles/communityIcon_rhpcgbf8rvs21.png"
      />
      <v-img
        v-if="item.Platform == 'Blizzard Launcher'"
        width="30px"
        contain
        src="../assets/blizzard.png"
      />
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:item.Finished="{ item }">
      <v-icon color="success" v-if="item.Finished">mdi-check-all</v-icon>
      <v-icon color="error" v-if="!item.Finished">mdi-cancel</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import db from "@/firebase/config";

export default {
  data() {
    return {
      loading: false,
      isDense: false,
      search: "",
      dialog: false,
      headers: [
        { text: "Game", align: "left", value: "Name" },
        { text: "Platform", value: "Platform" },
        { text: "Account", value: "Account" },
        { text: "Finished", value: "Finished" },
        { text: "Actions", value: "action", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        Name: "",
        Platform: "",
        Account: "",
        Finished: false,
      },
      defaultItem: {
        Name: "",
        Platform: "",
        Account: "",
        Finished: false,
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Game" : "Edit Game";
    },
    user: {
      get() {
        return this.$store.state.user;
      },
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
      if (this.editedItem.Name != "" && this.editedItem.Name != undefined) {
        return false;
      } else return true;
    },
  },
  methods: {
    saveSong() {
      if (this.editedIndex > -1) {
        // Update existing item
        db.collection("users")
          .doc(this.user.uid)
          .collection("games")
          .doc(this.editedItem.id)
          .update({
            Name: this.editedItem.Name,
            Platform: this.editedItem.Platform || "",
            Account: this.editedItem.Account || "",
            Finished: this.editedItem.Finished,
          });
        this.games.splice(this.editedIndex, 1, this.editedItem);
      } else {
        //Create new Item
        var newGame = {
          Name: this.editedItem.Name,
          Platform: this.editedItem.Platform || "",
          Account: this.editedItem.Account || "",
          Finished: this.editedItem.Finished,
        };
        db.collection("users")
          .doc(this.user.uid)
          .collection("games")
          .add(newGame)
          .then((response) => {
            newGame.id = response.id;
            this.games.push(newGame);
          });
      }
      this.closeDialog();
    },
    editItem(item) {
      this.editedIndex = this.games.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      db.collection("users")
        .doc(this.user.uid)
        .collection("games")
        .doc(item.id)
        .delete()
        .then(() => {
          this.games = this.games.filter((game) => {
            return game.id != item.id;
          });
        });
    },
    closeDialog() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    FinishedCheckAction(item) {
      this.loading = true;
      db.collection("users")
        .doc(this.user.uid)
        .collection("games")
        .doc(item.id)
        .update({
          Finished: !item.Finished,
        })
        .then(() => {
          var foundIndex = this.games.findIndex((x) => x.id == item.id);
          var updatedItem = {
            Name: item.Name,
            Platform: item.Platform,
            Account: item.Account,
            Finished: !item.Finished,
            id: item.id,
          };
          //Use splice to trigger update
          this.games.splice(foundIndex, 1, updatedItem);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
