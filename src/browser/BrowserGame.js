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

        /**
         * @property <{score<Function>, turn<Function>}> _listeners
         * @private
         */
        this._listeners = {
            score: () => {},
            turn: () => {},
            load: () => {},
        };
    }

    setReady() {
        this._isRunning = true;
        this._hideOutput = false;
    }

    async run() {
        const oldStateSnapshot = this._getStateSnapshot();
        this._print('\n\n');
        let _success = false;

        await this.readNewInput();

        this._print(`> ${this.getLastInput()}`);

        _success = this.evalGlobalEvents();
        _success = _success || this.evalLocalEvents();

        if (!_success) {
            this.printArbitraryMessage(
                this.getValueFromConstantsDictionary(
                    'commandError'
                ).getAsStringForGameCurrentLanguage(this)
            );
        }

        if (this._intent.load) {
            return;
        }

        this._turnCount++;
        this._evalUpdates(oldStateSnapshot, this._getStateSnapshot());
    }

    async readNewInput() {
        return this.IOHandler.read();
    }

    /**
     * Adds a listener
     *
     * @param {BrowserGameEvent} browserGameEvent
     * @param {Function} cb
     */
    addListener(browserGameEvent, cb) {
        this._listeners[browserGameEvent] = cb;
    }

    _getStateSnapshot() {
        return {
            turn: this._turnCount,
            score: this.getPlayerCharacter().getScore(),
        };
    }

    /**
     * Evaluates and calls any game state change listener
     *
     * @param {BrowserGameStateSnapshot} oldStateSnapshot
     * @param {BrowserGameStateSnapshot} newStateSnapshot
     */
    _evalUpdates(oldStateSnapshot, newStateSnapshot) {
        if (oldStateSnapshot.turn !== newStateSnapshot.turn) {
            this._listeners.turn(newStateSnapshot.turn);
        }

        if (oldStateSnapshot.score !== newStateSnapshot.score) {
            this._listeners.score(newStateSnapshot.score);
        }
    }

    onLoad(filename) {
        super.onLoad(filename);
        this._listeners.load(filename);
    }
}
