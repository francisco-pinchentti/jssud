/**
 * A class to represent and encapsulate game elements description dictionaries
 */
export class GameObjectDictionary {
    /**
     *
     * @param {Object} [dict={}]
     * @param {string[]} [dict.en=[]] array containing strings for 'en' language
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
}
