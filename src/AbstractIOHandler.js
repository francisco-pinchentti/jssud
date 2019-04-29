/**
 * @abstract
 */
export class AbstractIOHandler {
    constructor(inputs = []) {
        this.inputs = inputs
    }

    /**
     * @abstract
     * @returns {Promise}
     */
    read() {}

    feedInput(input) {
        this.inputs.push(input)
    }

    getLastInput() {
        return this.inputs[this.inputs.length - 1]
    }

    getInputAt(i) {
        return this.inputs[i]
    }

    /**
     * @abstract
     */
    print() {}

    /**
     *
     * @abstract
     * @param {string} filename
     * @param {object} [opts]
     */
    load(filename, opts) {}

    /**
     * @abstract
     * @param {string} filename
     * @param {object} [opts]
     */
    save(filename, opts) {}
}
