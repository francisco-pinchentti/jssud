import { GameObject } from './GameObject';
import { PickUpItemEvent, RoomTransitionEvent } from '../events';
import { GameTextDictionary } from '../text/GameTextDictionary';

/**
 * A single game room
 * - Normally a game consist of (among other stuff) a collection of rooms that the player character may visit
 */
export class Room extends GameObject {
    constructor(items = [], events = [], id, description, name) {
        super(id, description);

        /**
         * @property {Array<InventoryItem>} items
         */
        this.items = items;

        /**
         * @property {Array<GameEvent>} events
         */
        this.events = events;

        /**
         * @see: Assumes all items can be picked
         */
        this.items.forEach(item => this.addEvent(new PickUpItemEvent(item)));

        /**
         * @property {Array<Room>} destinations
         */
        this.destinations = [];

        this.name = name ? new GameTextDictionary(name) : null;
    }

    addEvent(evt) {
        this.events.push(evt);
    }

    removeEvent(evt) {
        this.events = this.events.filter(e => e !== evt);
    }

    getEvents() {
        return this.events;
    }

    addItem(item) {
        this.items.push(item);
        this.addEvent(new PickUpItemEvent(item));
    }

    removeItem(item) {
        this.items = this.items.filter(i => i !== item);
    }

    getItems() {
        return this.items;
    }

    /**
     * Connects the receiver room object with a given room, allowing the player to move from receiver to destination
     *
     * @param {Room} destinationRoom
     * @param {IGameTextDictionary} commands
     * @param {string} [id] identifier for the transition event that will be created
     */
    addDestination(destinationRoom, commands, id) {
        this.destinations.push(destinationRoom);
        this.events.push(
            new RoomTransitionEvent(commands, destinationRoom, id)
        );
    }

    hasItems() {
        return this.items.length > 0;
    }

    getItemsNamesForGameCurrentLanguage(game) {
        return this.items.map(item => item.getNameForGameCurrentLanguage(game));
    }
}
