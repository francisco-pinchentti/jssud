import { GameEvent } from './GameEvent';

/**
 * This event occurs when input matches an initial regular expression
 *
 * @extends GameEvent
 */
export class RegExpCommandEvent extends GameEvent {
    /**
     *
     * @param {function} onSuccessCb
     * @param {RegExp|string} expr
     * @param {string} id
     */
    constructor(onSuccessCb, expr, id) {
        super(onSuccessCb, id);
        if (typeof expr === 'string') {
            this.expr = new RegExp(expr);
        } else {
            this.expr = expr;
        }
    }

    evaluateOn(game) {
        const input = game.getLastInput();
        return this.expr.test(input);
    }
}
