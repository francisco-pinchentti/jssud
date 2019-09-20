const readline = require('readline')
const fs = require('fs')
import { AbstractIOHandler } from '../base/AbstractIOHandler'

/**
 * An IOHandler that's designed to use the NodeJS CLI
 */
export class CLIHandler extends AbstractIOHandler {
    constructor(inputs = []) {
        super(inputs)

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        })
    }

    /**
     *
     * @param {string} [promptMessage='> ']
     */
    read(promptMessage = '> ') {
        return new Promise((resolve, reject) => {
            this.rl.question(promptMessage, answer => {
                this.feedInput(answer)
                resolve(answer)
            })
        })
    }

    /**
     *
     * @param {string} output
     */
    print(output = '') {
        console.log(output)
    }

    clearOutputArea() {
        readline.cursorTo(process.stdout, 0, 0)
        readline.clearScreenDown(process.stdout)
    }

    /**
     *
     * @param {string} filename
     */
    load(filename) {
        try {
            const data = fs.readFileSync(filename)
            return JSON.parse(data)
        } catch (e) {
            return false
        }
    }

    /**
     *
     * @param {string} filename
     * @param {object} opts
     */
    save(filename, opts) {
        if (!opts) {
            throw new Error('Missing required argument: opts')
        }

        let inputs = this.inputs
        if (opts.ommitedInputs && opts.ommitedInputs.length) {
            inputs = this.inputs.filter(
                i => !opts.ommitedInputs.find(o => i === o)
            )
        }
        const data = JSON.stringify({
            language: opts.language,
            turnCount: opts.turnCount,
            gameSettings: opts.gameSettings,
            inputs,
        })
        try {
            fs.writeFileSync(filename, data)
            return true
        } catch (e) {
            return false
        }
    }

    onGameDestroy() {
        this.rl.close()
    }
}
