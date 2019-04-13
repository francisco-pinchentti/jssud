import { GameObject } from './GameObject'

/**
 * Represents an item (or in game object) that the player may eventually acquire and/or use
 */
export class InventoryItem extends GameObject {

    /**
     * @param {function} onUseCb a function like (game) => {} which will be called bound to the receiver instance (the item)
     * @param {string} id
     * @param {GameObjectDictionary} description
     * @param {GameObjectDictionary} name
     * @param {object} [pickUp]
     * @param {object} [pickUp.event]
     * @param {object} [pickUp.event.commands]
     * @param {object} [pickUp.event.onSuccessCb]
     * @param {object} [pickUp.event.onFailureCb]
     * @param {number} [pickUp.points=0]
     */
    constructor(onUseCb, id, description, name, pickUp) {
        super(id, description)
        this.name = name
        this.onUseCb = onUseCb
        if (pickUp) {
            this.pickUpPoints = pickUp.points || 0;
        }
    }

    /**
     *
     * @param {Game} game
     */
    useOn(game) {
        this.onUseCb.call(this, game)
    }
}
