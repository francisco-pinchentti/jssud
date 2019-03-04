import { CommandEvent } from './CommandEvent'

/**
 * An event that represents when a player looks or examines the current room in which she is standing
 * @extends CommandEvent
 */
export class QuitGameEvent extends CommandEvent {
    /**
     * @param {function} [onSuccessCb]
     * @param {object} [commands]
     */
    constructor(
        onSuccessCb = game => game.quit(),
        commands = { en: ['quit', 'q'] }
    ) {
        super(onSuccessCb, commands)
    }
}
