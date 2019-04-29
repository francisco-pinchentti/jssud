const readline = require('readline')
const fs = require('fs')
import { AbstractIOHandler } from './AbstractIOHandler'

/**
 * An IOHandler that's designed to use the CLI
 */
export class CLIHandler extends AbstractIOHandler {
    constructor(inputs = []) {
        super(inputs)

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        })
    }

    read() {
        return new Promise((resolve, reject) => {
            this.rl.question('>', answer => {
                this.feedInput(answer)
                resolve(answer)
            })
        })
    }

    print(output = '') {
        console.log(output)
    }

    load(filename) {
        try {
            const data = fs.readFileSync(filename)
            return JSON.parse(data)
        } catch (e) {
            return false
        }
    }

    save(filename, opts) {
        let inputs = this.inputs
        if (opts && opts.ommitedInputs && opts.ommitedInputs.length) {
            inputs = this.inputs.filter(
                i => !opts.ommitedInputs.find(o => i === o)
            )
        }
        const data = JSON.stringify({
            language: '',
            options: '',
            inputs,
        })
        try {
            fs.writeFileSync(filename, data)
            return true
        } catch (e) {
            return false
        }
    }
}
