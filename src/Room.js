import { GameObject } from './GameObject'

/**
 * A game room
 */
export class Room extends GameObject {
    constructor(items = [], events = [], id, description) {
        super(id, description)

        /**
         * @property {Array<InventoryItem>} items
         */
        this.items = items

        /**
         * @property {Array<GameEvent>} events
         */
        this.events = events
    }

    addEvent(evt) {
        this.events.push(evt)
    }

    removeEvent(evt) {
        this.events = this.events.filter(e => e === evt)
    }

    getEvents() {
        return this.events
    }
}
