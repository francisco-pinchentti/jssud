export class PlayerInventory {
    constructor(items = []) {
        this.items = items
    }

    has(item) {
        return !!this.items.find(it => it === item)
    }

    addItem(item) {
        this.items.push(item)
    }

    removeItem(item) {
        this.items = this.items.filter(it => it === item)
    }
}
