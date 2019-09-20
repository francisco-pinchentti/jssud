import { GameObject } from './GameObject';
import { GameTextDictionary } from '../text/GameTextDictionary';

/**
 * Represents an item (or in game object) that the player may eventually acquire and/or use
 */
export class InventoryItem extends GameObject {
    /**
     * @param {function} onUseCb a function like (game) => {} which will be called bound to the receiver instance (the item)
     * @param {string} id
     * @param {object} description
     * @param {object} name
     * @param {number} [pickUpPoints=0]
     * @param {function} [onLookCb] will be invoked after looking the item, optional
     * @param {function} [onPickUpCb] will be invoked after being picked up, optional
     */
    constructor(
        onUseCb,
        id,
        description,
        name,
        pickUpPoints = 0,
        onLookCb,
        onPickUpCb
    ) {
        super(id, description);
        this.name = new GameTextDictionary(name);
        this.onUseCb = onUseCb;
        this.pickUpPoints = pickUpPoints;
        this.onLookCb = onLookCb;
        this.onPickUpCb = onPickUpCb;
    }

    getNameForGameCurrentLanguage(game) {
        return this.name.getForGameCurrentLanguage(game);
    }

    /**
     *
     * @param {Game} game
     */
    useOn(game) {
        this.onUseCb.call(this, game);
    }

    /**
     * Will be invoked after looking the item, if onLookCb isn't defined it's a noop
     * @param {Game} game
     */
    onLook(game) {
        if (this.onLookCb) {
            this.onLookCb.call(this, game);
        }
    }

    /**
     * Will be invoked after picking up the item, if onPickUpCb isn't defined it's a noop
     * @param {Game} game
     */
    onPickUp(game) {
        if (this.onPickUpCb) {
            this.onPickUpCb.call(this, game);
        }
    }
}
