import { GameTextDictionary } from '../text/GameTextDictionary';
import { GameEvent } from './GameEvent';

/**
 * An event that will occur when the game receives gives predefined input
 * @extends GameEvent
 */
export class CommandEvent extends GameEvent {
    /**
     *
     * @param {function} onSuccessCb
     * @param {GameTextDictionary} commands
     * @param {string} [id]
     * @param {GameTextDictionary} [description]
     * @param {function} [onFailureCb]
     */
    constructor(onSuccessCb, commands, id, description, onFailureCb) {
        super(onSuccessCb, id, description, onFailureCb);
        this.commands = new GameTextDictionary(commands);
    }

    evaluateOn(game) {
        // @todo trim/sanitize input
        return this.commands
            .getForGameCurrentLanguage(game)
            .find(c => c === game.getLastInput());
    }
}
