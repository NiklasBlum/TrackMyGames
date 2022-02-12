import { GameState } from "@/models/localModels.js";

class Platform {
    constructor(id, name, icon = "mdi-steam", createdAt) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.createdAt = createdAt
    }
}

class Account {
    constructor(id, name, createdAt) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt
    }
}

class Game {
    constructor(id, name, platformId, accountId, editedAt, createdAt, gameState = GameState.uncategorized) {
        this.id = id;
        this.name = name;
        this.platformId = platformId;
        this.accountId = accountId;
        this.editedAt = editedAt;
        this.gameState = gameState;
        this.createdAt = createdAt;
    }
}

export { Platform, Account, Game, }