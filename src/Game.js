import { CLIHandler } from './CLIHandler'
import { PlayerCharacter } from './PlayerCharacter'
import { GameObjectDictionary } from './GameObjectDictionary'

/**
 * @constant ON_FAILURE_ENABLED executes onFailureCb for game events on loop
 * @todo move to a property/config setting
 */
const ON_FAILURE_ENABLED = true

/**
 * @todo review name, location
 * @constant DEFAULT_CONSTANTS_DICTIONARY
 */
const DEFAULT_CONSTANTS_DICTIONARY = {
    commandError: new GameObjectDictionary({
        en: ["didn't get that"],
        es: ['no entiendo eso último'],
    }),
    onTurn: new GameObjectDictionary({
        en: ['\t on turn'],
        es: ['\t en el turno'],
    }),
    onExit: new GameObjectDictionary({
        en: 'Goodbye',
        es: 'Adios',
    }),
    use: {
        en: ['use', 'u'],
        es: ['usar', 'u'],
    },
    pickUp: {
        en: ['take', 'grab', 'pick up'],
        es: ['coger', 'agarrar', 'tomar'],
    },
    look: {
        en: ['l', 'look', 'examine'],
        es: ['mirar', 'examinar', 'ver'],
    },
}

export class Game {
    /**
     *
     * @param {Array<GameEvent>} [events=[]]
     * @param {Array<Room>} [rooms=[]]
     * @param {number} [turnCount=0]
     * @param {PlayerCharacter} [playerCharacter]
     * @param {string} [currentLanguage='en']
     * @param {IOHandler} [IOHandler=CLIHandler]
     * @param {object} [userDefinedVariables]
     * @param {object} [constantsDictionary]
     */
    constructor(
        events = [],
        rooms = [],
        turnCount = 0,
        playerCharacter,
        currentLanguage = 'en',
        IOHandler,
        userDefinedVariables = {},
        constantsDictionary = DEFAULT_CONSTANTS_DICTIONARY
    ) {
        this.events = events
        this.rooms = rooms
        this.playerCharacter = playerCharacter || new PlayerCharacter()
        this._isRunning = false
        this._turnCount = turnCount
        this._currentLanguage = currentLanguage
        this.IOHandler = IOHandler || new CLIHandler()

        /**
         * @property {object} userDefinedVariables Holds game domain user defined variables (like custom game flags)
         */
        this.userDefinedVariables = userDefinedVariables

        /**
         * @property {object} constantsDictionary Holds game domain constants (like default messages)
         */
        this.constantsDictionary = constantsDictionary
    }

    async run() {
        // return new Promise( (resolve, reject) => {
        this._isRunning = true
        while (this._isRunning) {
            this.printCurrentRoomDescription()
            let _success = false

            await this.readNewInput()

            _success = this.evalGlobalEvents()
            _success = _success || this.evalLocalEvents()

            if (!_success) {
                this.printArbitraryMessage(
                    this.getValueFromConstantsDictionary(
                        'commandError'
                    ).getAsStringForGameCurrentLanguage(this)
                )
            }

            this._turnCount++
            this.printArbitraryMessage(
                `${this.getValueFromConstantsDictionary(
                    'onTurn'
                ).getAsStringForGameCurrentLanguage(this)} ${this._turnCount}`
            )
        }

        /*
        resolve({
            lastInput: this.getLastInput(),
            language: this._currentLanguage,
            turnCount: this._turnCount,
        })
     });
     */
        return {
            lastInput: this.getLastInput(),
            language: this._currentLanguage,
            turnCount: this._turnCount,
        }
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
            } else if (ON_FAILURE_ENABLED) {
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
            } else if (ON_FAILURE_ENABLED) {
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

    async readNewInput() {
        return this.IOHandler.read()
    }

    getPlayerCharacter() {
        return this.playerCharacter
    }

    getCurrentLanguage() {
        return this._currentLanguage
    }

    setCurrentLanguage(lang) {
        // @todo validate among list of languages
        this._currentLanguage = lang
    }

    movePlayerCharacterToRoom(room) {
        this.playerCharacter.moveToRoom(room)
    }

    printCurrentRoomDescription() {
        const currentRoom = this.getPlayerCharacter().getCurrentRoom()
        this.IOHandler.print(
            currentRoom.getDescriptionForGameCurrentLanguage(this).join('\n')
        )
        if (currentRoom.hasItems()) {
            this.IOHandler.print(
                currentRoom.getItemsNamesForGameCurrentLanguage(this).join('\n')
            )
        }
    }

    /**
     *
     * @param {string} message
     */
    printArbitraryMessage(message) {
        this.IOHandler.print(message)
    }

    /**
     *
     * @param {GameObjectDictionary} messageDict
     */
    printLocalizedMessage(messageDict) {
        this.IOHandler.print(
            messageDict.getAsStringForGameCurrentLanguage(this)
        )
    }

    quit() {
        this.printArbitraryMessage('Goodbye!')
        this._isRunning = false
    }

    onLoad(filename) {
        this._isRunning = false
    }

    doLoad(filename) {
        const data = this.IOHandler.load(filename)
        // @todo back to initial state
        // @see https://lodash.com/docs#cloneDeep
        // @todo reset events
        // @todo reset rooms
        // @todo reset player score, items...
        // @todo move player to initial room
        // @todo load initial userDefinedVariables
        data.inputs.forEach(i => {
            this.IOHandler.feedInput(i)
            this.evalGlobalEvents()
            this.evalLocalEvents()
        })
        this.turnCount = data.turnCount
        this._isRunning = true
    }

    save(filename) {
        const ommitedInputs = this.getNonPersistableInputs()
        this.IOHandler.save(filename, {
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
    setConstantsDictionaryValueFor(key) {
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

    getNonPersistableInputs() {
        return this.getNonPersistableEvents().reduce(
            (acc, ev) => acc.concat(ev.commands.getAsFlatArray()),
            []
        )
    }
}
