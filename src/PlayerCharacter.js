import { PlayerInventory } from './PlayerInventory'

export class PlayerCharacter {
    constructor(
        name = 'player',
        score = 0,
        inventory = new PlayerInventory(),
        currentRoom = undefined
    ) {
        this.name = name
        this.score = score
        this.inventory = inventory
        this.currentRoom = currentRoom
    }

    hasItem(item) {
        return this.inventory.has(item)
    }

    moveToRoom(room) {
        this.currentRoom = room
    }

    getCurrentRoom() {
        return this.currentRoom
    }
}
