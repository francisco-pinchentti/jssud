/**
 * A class used to represent and encapsulate game elements dictionaries
 *  - it is useful for both descriptions (used to print a localized message) and available commands grouped by language
 *  - it is created with a plain js object in the form of { 'lang-code-1': string[], 'lang-code-2': string[] }
 */
export class GameObjectDictionary {
    /**
     *
     * @param {Object} [dict] a plain js object in the form of { 'lang-code-1': string[], 'lang-code-2': string[] }
     */
    constructor(dict) {
        this.dict = dict
    }

    setForLanguage(lang, content) {
        this.dict[lang] = content
    }

    getForLanguage(lang) {
        return this.dict[lang]
    }

    getForGameCurrentLanguage(game) {
        return this.getForLanguage(game.getCurrentLanguage())
    }

    getAsStringForGameCurrentLanguage(game, separator = '\n') {
        return this.getForLanguage(game.getCurrentLanguage()).join(separator);
    }

}
