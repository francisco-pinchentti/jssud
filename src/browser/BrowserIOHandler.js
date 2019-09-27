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

    scrollWriteElement() {
        this._writeElement.scrollTo(0, this._writeElement.scrollHeight);
    }

    /**
     *
     * @param {string} output
     */
    print(output = '') {
        this._writeElement.textContent =
            this._writeElement.textContent + '\n' + output;
        // @todo consider a max scroll height to keep
        this.scrollWriteElement();
    }

    clearOutputArea() {
        this._writeElement.textContent = '';
    }

    /**
     *
     * @param {string} filename
     */
    load(filename) {
        try {
            const data = localStorage.getItem(filename);
            return JSON.parse(data);
        } catch (e) {
            return false;
        }
    }

    /**
     *
     * @param {string} filename
     * @param {object} opts
     */
    save(filename, opts) {
        if (!opts) {
            throw new Error('Missing required argument: opts');
        }

        let inputs = this.inputs;
        if (opts.ommitedInputs && opts.ommitedInputs.length) {
            inputs = this.inputs.filter(
                i => !opts.ommitedInputs.find(o => i === o)
            );
        }
        const data = JSON.stringify({
            language: opts.language,
            turnCount: opts.turnCount,
            gameSettings: opts.gameSettings,
            inputs,
        });

        localStorage.setItem(filename, data);
    }

    onGameDestroy() {
        throw new Error('Not implemented');
    }
}
