import { DEFAULT_CONSTANTS_DICTIONARY } from '../base/Constants';
import { AbstractGame } from '../base/AbstractGame';
import { CLIHandler } from './CLIHandler';

export class CLIGame extends AbstractGame {
    /**
     *
     * @param {Array<GameEvent>} [events=[]]
     * @param {Array<Room>} [rooms=[]]
     * @param {Array<string>} [availableLanguages=['en']]
     * @param {string} [currentLanguage='en']
     * @param {IOHandler} [IOHandler=CLIHandler]
     * @param {object} [userDefinedVariables]
     * @param {object} [constantsDictionary]
     */
    constructor(
        events = [],
        rooms = [],
        availableLanguages = ['en'],
        currentLanguage = 'en',
        userDefinedVariables = {},
        constantsDictionary = DEFAULT_CONSTANTS_DICTIONARY
    ) {
        super(
            events,
            rooms,
            availableLanguages,
            currentLanguage,
            new CLIHandler(),
            userDefinedVariables,
            constantsDictionary
        );
    }

    /**
     * Starts the game loop
     *
     *  - Will end on quit command or process kill
     */
    async run() {
        this._isRunning = true;
        this._hideOutput = false;
        while (this._isRunning) {
            this.printCurrentRoomSummary();
            let _success = false;

            await this.readNewInput();

            _success = this.evalGlobalEvents();
            _success = _success || this.evalLocalEvents();

            if (!_success) {
                this.printArbitraryMessage(
                    this.getValueFromConstantsDictionary(
                        'commandError'
                    ).getAsStringForGameCurrentLanguage(this)
                );
            }

            this._turnCount++;
            this.printArbitraryMessage(
                `${this.getValueFromConstantsDictionary(
                    'onTurn'
                ).getAsStringForGameCurrentLanguage(this)} ${this._turnCount}`
            );
        }

        this.IOHandler.onGameDestroy();

        return this._intent;
    }

    async readNewInput() {
        return this.IOHandler.read(`<${this._id}>  <====== `);
    }

    /**
     * When game main loop stops the run method will return an object describing what happened
     * @returns {object}
     */
    _createExitIntent() {
        return {
            id: this._id,
            lastInput: this.getLastInput(),
            language: this._currentLanguage,
            turnCount: this._turnCount,
        };
    }

    quit() {
        const message = this.getValueFromConstantsDictionary(
            'onExit'
        ).getAsStringForGameCurrentLanguage(this);
        this.printArbitraryMessage(message);
        this._isRunning = false;
        this._intent = Object.assign(
            {},
            {
                quit: true,
            }
        );
    }

}
