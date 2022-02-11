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
    constructor(id, name, platform, account, editedAt, createdAt, playType) {
        this.id = id;
        this.name = name;
        this.platform = platform;
        this.account = account;
        this.editedAt = editedAt;
        this.playType = playType;
        this.createdAt = createdAt;
    }
}

class PlayMode {
    constructor(playType, title, description, icon, color) {
        this.playType = playType;
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.color = color;
    }
}

const PlayType = {
    uncategorized: 'uncategorized',
    currentlyPlaying: "currentlyPlaying",
    completed: "completed",
    played: "played",
    notPlayed: "notPlayed",
    wishlist: "wishlist"
};

const EditMode = {
    new: 'new',
    edit: 'edit',
};

export { Platform, Account, Game, PlayMode, PlayType, EditMode, }