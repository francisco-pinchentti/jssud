import { PlayerInventory } from './PlayerInventory'

export class PlayerCharacter {

    /**
     * @param {string} [name='player']
     * @param {number} [score=0]
     * @param {PlayerInventory} [inventory]
     * @param {Room} [currentRoom]
     */
    constructor(
        name = 'player',
        score = 0,
        inventory,
        currentRoom
    ) {
        this.name = name
        this.score = score
        this.inventory = inventory || new PlayerInventory()
        this.currentRoom = currentRoom
        /**
         * @property {Room[]} visitedRooms
         */
        this.visitedRooms = []
    }

    addItem(item) {
        this.inventory.addItem(item);
        if (item.pickUpPoints) {
            this.score += item.pickUpPoints
        }
    }

    hasItem(item) {
        return this.inventory.has(item)
    }

    removeItem(item) {
        return this.inventory.removeItem(item)
    }

    moveToRoom(room) {
        this.currentRoom = room
        if (!this.visitedRooms.find(r => r === room)) {
            this.visitedRooms.push(room)
        }
    }

    getCurrentRoom() {
        return this.currentRoom
    }

    getScore() {
        return this.score;
    }

}
