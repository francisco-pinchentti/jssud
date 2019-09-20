import { DEFAULT_CONSTANTS_DICTIONARY } from '../base/Constants';
import { AbstractGame } from '../base/AbstractGame';
import { BrowserIOHandler } from './BrowserIOHandler';

export class BrowserGame extends AbstractGame {
    /**
     *
     * @param {Array<GameEvent>} [events=[]]
     * @param {Array<Room>} [rooms=[]]
     * @param {Array<string>} [availableLanguages=['en']]
     * @param {string} [currentLanguage='en']
     * @param {HTMLInputElement} readElement
     * @param {HTMLElement} writeElement
     * @param {object} [userDefinedVariables]
     * @param {object} [constantsDictionary]
     */
    constructor(
        events = [],
        rooms = [],
        availableLanguages = ['en'],
        currentLanguage = 'en',
        readElement,
        writeElement,
        userDefinedVariables = {},
        constantsDictionary = DEFAULT_CONSTANTS_DICTIONARY
    ) {
        super(
            events,
            rooms,
            availableLanguages,
            currentLanguage,
            new BrowserIOHandler(readElement, writeElement),
            userDefinedVariables,
            constantsDictionary
        );
    }

    async run() {
        this._isRunning = true;
        this._hideOutput = false;
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

    async readNewInput() {
        return this.IOHandler.read();
    }
}
