import { GameTextDictionary } from '../text/GameTextDictionary';

/**
 * @abstract
 * Base class to extend when representing game elements such as events, items, the player, etc
 */
export class GameObject {
    constructor(id, description) {
        this.id = id;
        this.description = description
            ? new GameTextDictionary(description)
            : null;
    }

    getId() {
        return this.id;
    }

    getDescriptionForLanguage(lang) {
        return this.description.getForLanguage(lang);
    }

    getDescriptionForGameCurrentLanguage(game) {
        return this.description.getForGameCurrentLanguage(game);
    }

    getAsStringForGameCurrentLanguage(game, separator) {
        return this.description.getAsStringForGameCurrentLanguage(
            game,
            separator
        );
    }
}
