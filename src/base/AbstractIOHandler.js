/**
 * Game objects should delegate all I/O operations on AbstractIOHandler subclasses
 *
 * @abstract
 */
export class AbstractIOHandler {
    constructor(inputs = []) {
        /**
         * @property {Array<string>} inputs History of commands entered by user
         */
        this.inputs = inputs;
    }

    /**
     * @abstract
     * @returns {Promise}
     */
    read() {}

    /**
     * @abstract
     */
    clearOutputArea() {}

    feedInput(input) {
        this.inputs.push(input);
    }

    getLastInput() {
        return this.inputs[this.inputs.length - 1];
    }

    getInputAt(i) {
        return this.inputs[i];
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

    /**
     * @abstract
     */
    onGameDestroy() {}
}
