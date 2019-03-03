/**
 * @abstract
 */
export class AbstractIOHandler {
    constructor(inputs = []) {
        this.inputs = inputs
    }

    /**
     * @abstract
     */
    read() {}

    getLastInput() {
        // return this.getInputAt[this.inputs.length - 1]
        return this.inputs[this.inputs.length - 1]
    }

    getInputAt(i) {
        return this.inputs[i]
    }

    /**
     * @abstract
     */
    print() {}
}
