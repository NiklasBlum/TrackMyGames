class Platform {
    constructor(id, name, icon, createdAt) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.createdAt = createdAt
    }
}

const EditMode = {
    new: 'new',
    edit: 'edit',
};

export { Platform, EditMode }