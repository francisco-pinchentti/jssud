/**
 * This class is used to represent the player's character inventory
 */
export class PlayerInventory {
    /**
     *
     * @param {Array<InventoryItem>} [items=[]]
     */
    constructor(items = []) {
        this.items = items
    }

    has(item) {
        return !!this.items.find(it => it === item)
    }

    addItem(item) {
        this.items.push(item)
        return this.items.length
    }

    removeItem(item) {
        this.items = this.items.filter(it => it === item)
        return item
    }
}
