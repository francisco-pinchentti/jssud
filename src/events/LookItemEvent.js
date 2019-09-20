import { GameEvent } from './GameEvent';
import { verbsNounMapping } from '../text/TextUtils';

/**
 * @extends GameEvent
 */
export class LookItemEvent extends GameEvent {
    /**
     * @param {InventoryItem} item
     * @param {string} [id]
     */
    constructor(item, id) {
        super(game => {
            game.printLocalizedMessage(this.item.description);
            item.onLook(game);
        }, id);
        this.item = item;
    }

    evaluateOn(game) {
        const noun = this.item.getNameForGameCurrentLanguage(game);
        const verbs = game.getLocalizedValueFromConstantsDictionary('look');
        return verbsNounMapping(verbs, noun).find(
            c => c === game.getLastInput()
        );
    }
}
