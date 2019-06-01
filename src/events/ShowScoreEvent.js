import { GameTextDictionary } from '../text/GameTextDictionary'
import { CommandEvent } from './CommandEvent'

/**
 * @extends CommandEvent
 */
export class ShowScoreEvent extends CommandEvent {
    /**
     * @param {object} [commands]
     * @param {object} [templates]
     * @param {function} [onSuccessCb]
     */
    constructor(
        commands = { en: ['score', 'ss'] },
        templates = {
            en: ['Current score is %1'],
        },
        onSuccessCb = game => {
            const message = this.templates
                .getForGameCurrentLanguage(game)
                .map(s => s.replace('%1', game.getPlayerCharacter().getScore()))
                .join('')
            game.printArbitraryMessage(message)
        }
    ) {
        super(onSuccessCb, commands)
        this.templates = new GameTextDictionary(templates)
    }
}
