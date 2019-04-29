import { verbsNounMapping } from './TextUtils'
import { GameEvent } from './GameEvent'
import { UseItemEvent } from './UseItemEvent'
import { LookItemEvent } from './LookItemEvent'

/**
 * @extends GameEvent
 */
export class PickUpItemEvent extends GameEvent {
    /**
     * @param {InventoryItem} item
     * @param {string} [id]
     */
    constructor(item, id) {
        super(game => {
            game.addItemToPlayerCharacter(this.item)
            game.getPlayerCharacter().addToScore(this.item.pickUpPoints)
            game.getPlayerCharacter()
                .getCurrentRoom()
                .removeEvent(this)
            game.getPlayerCharacter()
                .getCurrentRoom()
                .removeItem(this.item)
            game.addEvent(new UseItemEvent(item))
            game.addEvent(new LookItemEvent(item))
            item.onPickUp(game)
        }, id)
        this.item = item
    }

    evaluateOn(game) {
        const noun = this.item.getNameForGameCurrentLanguage(game)
        const verbs = game.getLocalizedValueFromConstantsDictionary('pickUp')
        return verbsNounMapping(verbs, noun).find(
            c => c === game.getLastInput()
        )
    }
}
