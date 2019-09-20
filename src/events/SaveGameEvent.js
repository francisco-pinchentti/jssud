import { CommandEvent } from './CommandEvent';

/**
 * @extends CommandEvent
 */
export class SaveGameEvent extends CommandEvent {
    /**
     * @param {object} [commands]
     * @param {string} [filename]
     */
    constructor(commands = { en: ['save'] }, filename = 'savegame.dat') {
        super(game => {
            game.save(this.filename);
        }, commands);
        this.filename = filename;

        /**
         * @readonly
         * @property {boolean} avoidPersist
         */
        this.avoidPersist = true;
    }
}
