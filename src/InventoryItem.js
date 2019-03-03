import { GameObject } from './GameObject'

/**
 * Represents an item (or in game object) that the player may eventually acquire and/or use
 */
export class InventoryItem extends GameObject {

    /**
     * @param {function} onUseCb a function like (game) => {} which will be called bound to the receiver instance (the item)
     * @param {string} id
     * @param {GameObjectDictionary} description
     * @param {number} [pickUpPoints=0]
     */
    constructor(onUseCb, id, description, pickUpPoints = 0) {
        super(id, description)
        this.onUseCb = onUseCb
        this.pickUpPoints = pickUpPoints;
    }

    /**
     *
     * @param {Game} game
     */
    useOn(game) {
        this.onUseCb.call(this, game)
    }
}
