import { RegExpCommandEvent } from './RegExpCommandEvent';

/**
 * @extends RegExpCommandEvent
 */
export class ChangeLanguageEvent extends RegExpCommandEvent {
    constructor(expr = /^SET_LANG=.+/, separator = '=', id) {
        super(
            game => {
                const vals = this.parseOn(game);
                // @todo validate with game object:
                if (vals[1]) {
                    game.setCurrentLanguage(vals[1]);
                } else throw new Error('Invalid language code received');
            },
            expr,
            id
        );
        this.separator = separator;
    }

    parseOn(game) {
        const input = game.getLastInput();
        return input.split(this.separator);
    }
}
