import { CLIHandler } from './CLIHandler'
import { PlayerCharacter } from './PlayerCharacter'

const ON_FAILURE_ENABLED = true

export class Game {
    /**
     *
     * @param {GameEvent[]} [events=[]]
     * @param {Room[]} [rooms=[]]
     * @param {number} [turnCount=0]
     * @param {PlayerCharacter} [playerCharacter]
     * @param {string[]} [languages=['en']]
     * @param {string} [currentLanguage='en']
     * @param {IOHandler} [IOHandler=CLIHandler]
     */
    constructor(
        events = [],
        rooms = [],
        turnCount = 0,
        playerCharacter,
        languages = ['en'],
        currentLanguage = 'en',
        IOHandler
    ) {
        this.events = events
        this.rooms = rooms
        this.playerCharacter = playerCharacter || new PlayerCharacter()
        this.languages = languages
        this._isRunning = false
        this._turnCount = turnCount
        this._currentLanguage = currentLanguage
        this.IOHandler = IOHandler || new CLIHandler()
    }

    async run() {
        this._isRunning = true
        while (this._isRunning) {
            this.printCurrentRoomDescription()
            let _success = false

            const input = await this.IOHandler.read()
            // eval global events:
            for (let i = 0, len = this.events.length; i < len; i++) {
                if (this.events[i].evaluateOn(this)) {
                    this.events[i].onSuccess(this)
                    _success = true
                } else if (ON_FAILURE_ENABLED) {
                    this.events[i].onFailure(this)
                }
            }

            // eval room events:
            const localEvents = this.getPlayerCharacter()
                .getCurrentRoom()
                .getEvents()
            for (let i = 0, len = localEvents.length; i < len; i++) {
                if (localEvents[i].evaluateOn(this)) {
                    localEvents[i].onSuccess(this)
                    _success = true
                } else if (ON_FAILURE_ENABLED) {
                    localEvents[i].onFailure(this)
                }
            }

            if (!_success) {
                this.printArbitraryMessage(`\tdidn't get that`)
            }

            this._turnCount++
            this.printArbitraryMessage(`\ton turn ${this._turnCount}`)
        }
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
        return this.IOHandler.read()
    }

    getPlayerCharacter() {
        return this.playerCharacter
    }

    getCurrentLanguage() {
        return this._currentLanguage
    }

    movePlayerCharacterToRoom(room) {
        this.playerCharacter.moveToRoom(room)
    }

    printCurrentRoomDescription() {
        const str = this.getPlayerCharacter()
            .getCurrentRoom()
            .getDescriptionForGameCurrentLanguage(this)
        this.IOHandler.print(str.join('\n'))
    }

    printArbitraryMessage(message) {
        this.IOHandler.print(message)
    }

    quit() {
        this.printArbitraryMessage('Goodbye!')
        this._isRunning = false
    }
}
