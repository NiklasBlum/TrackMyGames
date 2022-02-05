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
    constructor(id, name, platform, account, isFinished, createdAt) {
        this.id = id;
        this.name = name;
        this.platform = platform;
        this.account = account;
        this.isFinished = isFinished;
        this.createdAt = createdAt
    }
}

const EditMode = {
    new: 'new',
    edit: 'edit',
};

export { Platform, Account, Game, EditMode }