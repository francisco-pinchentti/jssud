import { CommandEvent } from './CommandEvent'

/**
 * @extends CommandEvent
 */
export class RoomTransitionEvent extends CommandEvent {
    /**
     * @param {object} commands
     * @param {Room} destination
     * @param {string} [id]
     */
    constructor(commands, destination, id) {
        super(
            game => {
                game.movePlayerCharacterToRoom(this.destination)
            },
            commands,
            id
        )
        this.destination = destination
    }
}
