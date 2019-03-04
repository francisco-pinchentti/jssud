import { GameObjectDictionary } from './GameObjectDictionary'

/**
 * @abstract
 */
export class GameObject {
    constructor(id, description) {
        this.id = id
        this.description = new GameObjectDictionary(description)
    }

    getId() {
        return this.id
    }

    getDescriptionForLanguage(lang) {
        return this.description.getForLanguage(lang)
    }

    getDescriptionForGameCurrentLanguage(game) {
        return this.description.getForGameCurrentLanguage(game)
    }

    getAsStringForGameCurrentLanguage(game, separator) {
        return this.description.getAsStringForGameCurrentLanguage(game, separator)
    }
}
