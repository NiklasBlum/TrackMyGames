<template>
  <v-dialog v-model="showDialog" max-width="600px">
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
                v-model="gameItem.platformId"
                :items="platforms"
                item-value="id"
                item-text="name"
                label="Platforms"
                clearable
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                v-model="gameItem.accountId"
                :items="accounts"
                item-value="id"
                item-text="name"
                label="Accounts"
                clearable
              />
            </v-col>
            <v-col>
              <GameStateDialog
                @gameStateChanged="gameItem.gameState = $event"
                :gameState="gameItem.gameState"
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
import GameStateDialog from "@/components/dialogs/GameStateDialog.vue";
export default {
  props: {
    gameItem: Object,
    showDialog: Boolean,
  },
  components: {
    GameStateDialog,
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

<style>
</style>