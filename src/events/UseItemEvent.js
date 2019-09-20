import { GameEvent } from './GameEvent';
import { verbsNounMapping } from '../text/TextUtils';

/**
 * @extends GameEvent
 */
export class UseItemEvent extends GameEvent {
    /**
     * @param {InventoryItem} item
     * @param {string} [id]
     */
    constructor(item, id) {
        super(game => item.useOn.call(item, game), id);
        this.item = item;
    }

    evaluateOn(game) {
        const noun = this.item.getNameForGameCurrentLanguage(game);
        const verbs = game.getLocalizedValueFromConstantsDictionary('use');
        return verbsNounMapping(verbs, noun).find(
            c => c === game.getLastInput()
        );
    }
}
