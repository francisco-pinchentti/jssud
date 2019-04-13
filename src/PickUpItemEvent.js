import { CommandEvent } from './CommandEvent'

/**
 * @extends CommandEvent
 */
export class PickUpItemEvent extends CommandEvent {
    /**
     * @param {InventoryItem} item
     * @param {object} [commands]
     * @param {object} [useCommands]
     */
    constructor(
        item,
        commands,
        useCommands
    ) {        
        super((game) => {
            game.addItemToPlayerCharacter(this.item)
            game.getPlayerCharacter().addToScore(this.item.pickUpPoints)
            game.getPlayerCharacter().getCurrentRoom().removeEvent(this)            
            game.getPlayerCharacter().getCurrentRoom().removeItem(this.item)
            game.addEvent(new UseItemEvent(game, item, useCommands))
        }, commands || {
            'en': [ `take ${item.name}`]
        })
        // @todo for commands: verb+noun mapping
        this.item = item
    }

    getItem() {
        return this.item
    }
}
