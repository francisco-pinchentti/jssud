import { GameObjectDictionary } from '../GameObjectDictionary'
import { GameEvent } from './GameEvent'

/**
 * An event that will occur when the game receives gives predefined input
 * @extends GameEvent
 */
export class CommandEvent extends GameEvent {
    /**
     *
     * @param {function} onSuccessCb
     * @param {GameObjectDictionary} commands
     * @param {string} [id]
     * @param {GameObjectDictionary} [description]
     * @param {function} [onFailureCb]
     */
    constructor(onSuccessCb, commands, id, description, onFailureCb) {
        super(onSuccessCb, id, description, onFailureCb)
        this.commands = new GameObjectDictionary(commands)
    }

    evaluateOn(game) {
        // @todo trim/sanitize input
        return this.commands
            .getForGameCurrentLanguage(game)
            .find(c => c === game.getLastInput())
    }
}
