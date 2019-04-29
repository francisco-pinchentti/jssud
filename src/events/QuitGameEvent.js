import { CommandEvent } from './CommandEvent'

/**
 * An event that represents when a player looks or examines the current room in which she is standing
 * @extends CommandEvent
 */
export class QuitGameEvent extends CommandEvent {
    /**
     * @param {object} [commands]
     * @param {function} [onSuccessCb]
     */
    constructor(
        commands = { en: ['quit', 'q'] },
        onSuccessCb = game => game.quit()
    ) {
        super(onSuccessCb, commands)
    }
}
