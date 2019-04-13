import { CommandEvent } from './CommandEvent'

/**
 * @extends CommandEvent
 */
export class UseItemEvent extends CommandEvent {
    /**
     * @param {Game} game
     * @param {InventoryItem} item
     * @param {object} [commands]
     */
    constructor(
        onSuccessCb = game => item.useOn.call(item, game),
        commands = { en: [`take ${item.name}`] }
    ) {
        // @todo for commands: verb+noun mapping
        super(onSuccessCb, commands)
    }
}
