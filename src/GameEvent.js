import { GameObject } from './GameObject'

/**
 * @abstract
 */
export class GameEvent extends GameObject {
    constructor(onSuccessCb, id, description, onFailureCb) {
        super(id, description)
        this.onSuccessCb = onSuccessCb
        this.onFailureCb = onFailureCb
    }

    evaluateOn(game) {}

    onSuccess(game) {
        if (!!this.onSuccessCb) {
            this.onSuccessCb.call(this, game)
        }
    }

    onFailure(game) {
        if (!!this.onFailureCb) {
            this.onFailureCb.call(this, game)
        }
    }
}
