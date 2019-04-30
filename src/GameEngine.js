/**
 *  - Wraps a Game running instance
 *  - Normally a single instance is created with a function that returns a new Game object
 */
export class GameEngine {
    /**
     *
     * @param {function<Game>} gameBuildFunction A game factory function. It should return a complete Game object instance
     */
    constructor(gameBuildFunction) {
        this._gameBuildFunction = gameBuildFunction
        this._game = null
    }

    _runGame(opts) {
        this._game = this._gameBuildFunction()
        if (opts.filenameToLoad) {
            this._game.doLoad(opts.filenameToLoad)
        }
        return this._game.run()
    }

    /**
     * Starts the game defined in the gameBuildFunction
     *  - This method internally will create/destroy the game
     *  - Normal execution should start here and NOT calling directly Game.run()
     *
     * @param {object} [additionalOptions={}]
     */
    async run(additionalOptions = {}) {
        let filenameToLoad = null
        let stop = false
        do {
            const intent = await this._runGame({
                ...additionalOptions,
                filenameToLoad,
            })
            if (intent.load) {
                filenameToLoad = intent.filenameToLoad || 'savegame.dat'
            } else if (intent.quit) {
                stop = true
            }
        } while (!stop)
        return false
    }
}
