<template>
  <v-dialog v-model="showDialog" max-width="600px">
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
                clearable
                hide-details
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
              />
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
import GameStateList from "@/components/Game/Dialogs/GameStateList.vue";
export default {
  props: {
    gameItem: Object,
    showDialog: Boolean,
  },
  components: {
    GameStateList,
  },
  computed: {
    ...mapState(["platforms", "accounts"]),

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