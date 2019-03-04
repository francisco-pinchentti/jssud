import { CommandEvent } from './CommandEvent'
import { GameObjectDictionary } from './GameObjectDictionary';

/**
 * @extends CommandEvent
 */
export class ShowScoreEvent extends CommandEvent {
    /**
     * @param {function} [onSuccessCb]
     * @param {object} [commands]
     */
    constructor(
        onSuccessCb = game => {
            const dict = new GameObjectDictionary({
                'en': [`Current score is ${game.getPlayerCharacter().getScore()}`]
            })
            game.printLocalizedMessage(dict);
        },
        commands = { en: ['score', 'ss'] }
    ) {
        super(onSuccessCb, commands)
    }
}
