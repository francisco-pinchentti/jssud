import { AbstractIOHandler } from '../base/AbstractIOHandler';

/**
 * An IOHandler that's designed to use the browser
 */
export class BrowserIOHandler extends AbstractIOHandler {
    /**
     * @param {HTMLInputElement} readElement
     * @param {HTMLElement} writeElement
     */
    constructor(readElement, writeElement) {
        super([]);
        this._readElement = readElement;
        this._writeElement = writeElement;
    }

    read() {
        return new Promise((resolve, reject) => {
            const val = this._readElement.value;
            this._readElement.value = null;
            this.feedInput(val);
            resolve(val);
        });
    }

    /**
     *
     * @param {string} output
     */
    print(output = '') {
        this._writeElement.textContent = this._writeElement.textContent + '\n' + output;
    }

    clearOutputArea() {
        this._writeElement.textContent = '';
    }

    /**
     *
     * @param {string} filename
     */
    load(filename) {
        throw new Error('Not implemented');
    }

    /**
     *
     * @param {string} filename
     * @param {object} opts
     */
    save(filename, opts) {
        throw new Error('Not implemented');
    }

    onGameDestroy() {
        throw new Error('Not implemented');
    }
}
