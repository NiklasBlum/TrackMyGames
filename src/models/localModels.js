class GameStateInfo {
    constructor(gameState, title, description, icon, color) {
        this.gameState = gameState;
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.color = color;
    }
}

const GameState = {
    uncategorized: 'uncategorized',
    currentlyPlaying: "currentlyPlaying",
    completed: "completed",
    played: "played",
    notPlayed: "notPlayed",
    wishlist: "wishlist"
};

const DialogMode = {
    new: 'new',
    edit: 'edit',
};

export { GameState, GameStateInfo, DialogMode }