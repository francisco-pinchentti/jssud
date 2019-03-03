const readline = require('readline')
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
                debugger
                this.inputs.push(answer)
                resolve(answer)
            })
        })
    }

    print(output = '') {
        console.log(output)
    }
}
