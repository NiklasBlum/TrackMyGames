<template>
  <v-dialog persistent v-model="showDialog" max-width="600px">
    <v-card outlined elevation="5">
      <v-card-title class="primary">
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text style="padding-bottom: 0">
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="gameItem.name"
                label="Game Name"
                autofocus
                :hint="hint"
                clearable
                :rules="rules"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                v-model="gameItem.platformId"
                :items="platforms"
                item-value="id"
                item-text="name"
                label="Platforms"
                hide-details
                clearable
              >
                <template v-slot:item="data">
                  <v-list-item-avatar>
                    <v-icon>{{ data.item.icon }}</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.name"
                    ></v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" sm="6" md="12">
              <v-select
                v-model="gameItem.accountId"
                :items="accounts"
                item-value="id"
                item-text="name"
                label="Accounts"
                hide-details
                clearable
              />
            </v-col>
            <v-col>
              <GameStateList
                @gameStateIdChanged="gameItem.gameStateId = $event"
                :gameStateId="gameItem.gameStateId"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="$emit('closed')">
          Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="$emit('saved', gameItem)"
          :disabled="isSavingValid"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
import GameStateList from "@/components/Game/GameStateList.vue";
export default {
  props: {
    gameItem: Object,
    showDialog: Boolean,
  },
  data() {
    return {
      rules: [(value) => !!value || "Required."],
    };
  },
  components: {
    GameStateList,
  },
  computed: {
    ...mapState(["platforms", "accounts", "games"]),
    hint() {
      if (this.gameItem.name) {
        var match = this.games.filter((game) => {
          return game.name.toLowerCase() == this.gameItem.name.toLowerCase();
        });
        return match.length > 0 ? "Game already exists!" : undefined;
      }
      return undefined;
    },
    isSavingValid() {
      if (this.gameItem.name != "" && this.gameItem.name != undefined) {
        return false;
      } else return true;
    },
    formTitle() {
      return this.gameItem.name != undefined ? "Edit Game" : "New Game";
    },
  },
};
</script>