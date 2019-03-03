import { CommandEvent } from './CommandEvent'

/**
 * An event that represents when a player looks or examines the current room in which she is standing
 * @extends CommandEvent
 */
export class QuitGameEvent extends CommandEvent {
    /**
     *
     * @param {object} commands
     */
    constructor(commands = { en: ['quit', 'q'] }) {
        super(game => game.quit(), commands)
    }
}
