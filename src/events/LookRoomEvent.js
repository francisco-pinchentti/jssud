import { CommandEvent } from './CommandEvent'

/**
 * An event that represents when a player looks or examines the current room in which she is standing
 */
export class LookRoomEvent extends CommandEvent {
    /**
     *
     * @param {object} commands
     */
    constructor(commands = { en: ['look', 'l'] }) {
        super(game => game.printCurrentRoomDetails(), commands)
    }
}
