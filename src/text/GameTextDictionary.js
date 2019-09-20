/**
 * A class used to represent and encapsulate game elements dictionaries
 *  - it is useful for both descriptions (used to print a localized message) and available commands grouped by language
 *  - it is created with a plain js object in the form of { 'lang-code-1': string[], 'lang-code-2': string[] }
 *  - @todo: check if it's convenient an ES6 Set/Map implementation
 */
export class GameTextDictionary {
    /**
     *
     * @param {Object} [dict] a plain js object in the form of { 'lang-code-1': string[], 'lang-code-2': string[] }
     */
    constructor(dict) {
        this.dict = dict;
    }

    setForLanguage(lang, content) {
        this.dict[lang] = content;
    }

    /**
     *
     * @param {string} lang
     * @returns {Array<string>}
     */
    getForLanguage(lang) {
        return this.dict[lang];
    }

    /**
     *
     * @param {Game} game
     * @returns {Array<string>}
     */
    getForGameCurrentLanguage(game) {
        return this.getForLanguage(game.getCurrentLanguage());
    }

    /**
     *
     * @param {Game} game
     * @param {string} [separator='\n']
     * @returns {string}
     */
    getAsStringForGameCurrentLanguage(game, separator = '\n') {
        // @todo: make support for string[] and string using typeof
        return this.getForLanguage(game.getCurrentLanguage()).join(separator);
    }

    getAsFlatArray() {
        return Object.keys(this.dict).reduce(
            (acc, k) => acc.concat(this.dict[k]),
            []
        );
    }
}
