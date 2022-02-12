class Platform {
    constructor(id, name, icon, createdAt) {
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
    constructor(id, name, platform, account, editedAt, createdAt, gameState) {
        this.id = id;
        this.name = name;
        this.platform = platform;
        this.account = account;
        this.editedAt = editedAt;
        this.gameState = gameState;
        this.createdAt = createdAt;
    }
}


export { Platform, Account, Game, }