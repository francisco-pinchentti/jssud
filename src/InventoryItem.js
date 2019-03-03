import { GameObject } from './GameObject'

/**
 * Represents an item (or in game object) that the player may eventually acquire and/or use
 */
export class InventoryItem extends GameObject {
    /**
     *
     * @param {function} onUseCb a function like (game) => {} which will be called bound to the receiver instance (the item)
     * @param {string} id
     * @param {GameObjectDictionary} description
     */
    constructor(onUseCb, id, description) {
        super(id, description)
        this.onUseCb = onUseCb
    }

    /**
     *
     * @param {Game} game
     */
    useOn(game) {
        this.onUseCb.call(this, game)
    }
}
