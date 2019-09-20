import { PlayerCharacter } from './PlayerCharacter'
import { GameTextDictionary } from '../text/GameTextDictionary'
const uuidv4 = require('uuid/v4')

export class AbstractGame {
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
        events,
        rooms,
        availableLanguages,
        currentLanguage,
        IOHandler,
        userDefinedVariables,
        constantsDictionary
    ) {
        /**
         * @property {Array<GameEvent>} events
         */
        this.events = events
        /**
         * @property {Array<Rooms>} rooms
         */
        this.rooms = rooms
        this.playerCharacter = new PlayerCharacter()
        this._isRunning = false
        this._turnCount = 0
        this._availableLanguages = availableLanguages
        this._currentLanguage = currentLanguage

        /**
         * @property {Object<AbstractIOHandler>} IOHandler where game I/O is delegated
         */
        this.IOHandler = IOHandler

        /**
         * @property {object} userDefinedVariables Holds game domain user defined variables (like custom game flags)
         */
        this.userDefinedVariables = userDefinedVariables

        /**
         * @property {object} constantsDictionary Holds game domain constants (like default messages)
         */
        this.constantsDictionary = constantsDictionary

        /**
         * @property {string} _id useful for debugging purpouses
         */
        this._id = uuidv4()

        /**
         * @property {object} _intent will be used when game loop is stopped, paused, etc
         */
        this._intent = null

        /**
         * @property {boolean} _onFailureCbEnabled executes onFailureCb for game events on loop
         */
        this._onFailureCbEnabled = true

        /**
         * @property {boolean} _hideOutput print() calls will be no-op when this flag is true
         */
        this._hideOutput = true
    }

    run() {
        throw new Error('Abstract method')
    }

    /**
     * @returns {boolean} true if at least one event ocurred, false otehrwise
     */
    evalGlobalEvents() {
        let result = false
        this.events.forEach(evt => {
            if (evt.evaluateOn(this)) {
                evt.onSuccess(this)
                result = true
            } else if (this._onFailureCbEnabled) {
                evt.onFailure(this)
            }
        })
        return result
    }

    /**
     * @returns {boolean} true if at least one event ocurred, false otehrwise
     */
    evalLocalEvents() {
        let result = false
        const localEvents = this.getPlayerCharacter()
            .getCurrentRoom()
            .getEvents()
        localEvents.forEach(evt => {
            if (evt.evaluateOn(this)) {
                evt.onSuccess(this)
                result = true
            } else if (this._onFailureCbEnabled) {
                evt.onFailure(this)
            }
        })
        return result
    }

    addEvent(event) {
        return this.events.push(event)
    }

    addRoom(room) {
        this.rooms.push(room)
    }

    addItemToPlayerCharacter(item) {
        return this.playerCharacter.addItem(item)
    }

    removeItemFromPlayerCharacter(item) {
        return this.playerCharacter.removeItem(item)
    }

    getLastInput() {
        return this.IOHandler.getLastInput()
    }

    readNewInput() {
        throw new Error('Abstract method')
    }

    getPlayerCharacter() {
        return this.playerCharacter
    }

    getCurrentLanguage() {
        return this._currentLanguage
    }

    setCurrentLanguage(lang) {
        if (!this._availableLanguages.includes(lang)) {
            throw new Error(`Invalid language code supplied: ${lang}`)
        }
        this._currentLanguage = lang
    }

    movePlayerCharacterToRoom(room) {
        this.playerCharacter.moveToRoom(room)
    }

    /**
     *
     * @param {string} message
     */
    _print(message) {
        if (!this._hideOutput) {
            this.IOHandler.print(`<${this._id}>\t\t${message}`)
        }
    }

    /**
     * Prints current room description
     */
    printCurrentRoomSummary() {
        const currentRoom = this.getPlayerCharacter().getCurrentRoom()
        this._print(
            currentRoom.getDescriptionForGameCurrentLanguage(this).join('\n')
        )
    }

    /**
     * Prints current room content
     */
    printCurrentRoomDetails() {
        const currentRoom = this.getPlayerCharacter().getCurrentRoom()
        if (currentRoom.hasItems()) {
            const message = this.getValueFromConstantsDictionary(
                'onLookRoom'
            ).getAsStringForGameCurrentLanguage(this)
            this._print(message)
            this._print(
                currentRoom.getItemsNamesForGameCurrentLanguage(this).join('\n')
            )
        }
    }

    /**
     *
     * @param {string} message
     */
    printArbitraryMessage(message) {
        this._print(message)
    }

    /**
     *
     * @param {GameTextDictionary} messageDict
     */
    printLocalizedMessage(messageDict) {
        this._print(messageDict.getAsStringForGameCurrentLanguage(this))
    }

    quit() {
        throw new Error('Abstract method')
    }

    onLoad(filename) {
        throw new Error('Abstract method')
    }

    doLoad(filename) {
        const data = this.IOHandler.load(filename)
        this._hideOutput = true
        if (data.inputs && data.inputs.length) {
            data.inputs.forEach(i => {
                this.IOHandler.feedInput(i)
                this.evalGlobalEvents()
                this.evalLocalEvents()
            })
        }
        this._turnCount = data.turnCount
        this.IOHandler.clearOutputArea()
        this._hideOutput = false
        const message = this.getValueFromConstantsDictionary(
            'onLoad'
        ).getAsStringForGameCurrentLanguage(this)
        this.printArbitraryMessage(message)
    }

    save(filename) {
        const ommitedInputs = this.getNonPersistableInputs()
        this.IOHandler.save(filename, {
            turnCount: this._turnCount,
            language: this._currentLanguage,
            gameSettings: {},
            ommitedInputs,
        })
    }

    /**
     *
     * @param {string} key
     * @returns {object}
     */
    getUserDefinedVariableFor(key) {
        return this.userDefinedVariables[key]
    }

    /**
     *
     * @param {string} key
     * @param {object} value
     */
    setValueForUserDefinedVariable(key, value) {
        this.userDefinedVariables[key] = value
    }

    /**
     * @param {string} key
     * @returns {object}
     */
    getValueFromConstantsDictionary(key) {
        return this.constantsDictionary[key]
    }

    /**
     * @param {string} key
     * @param {object} value
     */
    setConstantsDictionaryValueFor(key, value) {
        this.constantsDictionary[key] = value
    }

    /**
     *
     * @param {string} key a valid property of constantsDictionary
     * @returns {object}
     */
    getLocalizedValueFromConstantsDictionary(key) {
        return this.getValueFromConstantsDictionary(key)[
            this.getCurrentLanguage()
        ]
    }

    getNonPersistableEvents() {
        return this.events.filter(e => e.avoidPersist)
    }

    /**
     * @see: this could be moved inside CLIHandler
     */
    getNonPersistableInputs() {
        return this.getNonPersistableEvents().reduce(
            (acc, ev) => acc.concat(ev.commands.getAsFlatArray()),
            []
        )
    }
}
