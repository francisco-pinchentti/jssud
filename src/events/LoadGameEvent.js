import { CommandEvent } from './CommandEvent'

/**
 * @extends CommandEvent
 */
export class LoadGameEvent extends CommandEvent {
    /**
     * @param {object} [commands]
     * @param {string} [filename]
     */
    constructor(commands = { en: ['load'] }, filename = 'savegame.dat') {
        super(game => {
            game.load(this.filename)
        }, commands)
        this.filename = filename

        /**
         * @readonly
         * @property {boolean} avoidPersist
         */
        this.avoidPersist = true
    }
}
