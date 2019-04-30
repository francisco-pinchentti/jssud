import { Room, Game, GameEngine, InventoryItem } from '../src'
import {
    CommandEvent,
    SaveGameEvent,
    QuitGameEvent,
    LookRoomEvent,
    ShowScoreEvent,
    LoadGameEvent,
} from '../src/events'

/**
 * Demo 1: Basics
 *  - events
 *  - rooms
 *  - items
 *  - initialization
 */

/**
 * Creates a new Game instance
 *
 * @returns {Game} a new game object
 */
function initializeNewGame() {
    const events = [
        new CommandEvent(
            game => game.printArbitraryMessage('on a custom event'),
            {
                en: ['custom', 'cc', 'cu'],
            },
            'ce001'
        ),
        new QuitGameEvent(),
        new LookRoomEvent(),
        new ShowScoreEvent(),
        new SaveGameEvent(),
        new LoadGameEvent(),
    ]

    const rooms = [
        new Room(
            [],
            [
                new CommandEvent(
                    game =>
                        game.printArbitraryMessage(
                            'the door seems to be locked'
                        ),
                    {
                        en: ['go north', 'n'],
                    },
                    'ce002'
                ),
            ],
            'r001',
            {
                en: ['This is the first room: you see a door to the north'],
            }
        ),
        new Room([], [], 'r002', {
            en: ['This is the second room'],
        }),
    ]

    const keyItem = new InventoryItem(
        game => {
            // looking for an event using it's id:
            const lockedRoomEvent = rooms[0]
                .getEvents()
                .find(evt => evt.id === 'ce002')
            if (lockedRoomEvent) {
                game.printArbitraryMessage('You open the door to the north...')
                rooms[0].removeEvent(lockedRoomEvent)
                // an event onSuccess may be used to create another:
                rooms[0].addDestination(rooms[1], {
                    en: ['go north'],
                })
            } else {
                game.printArbitraryMessage("it seems it can't be used here...")
            }
        },
        'it001',
        {
            en: ['an iron key'],
        },
        {
            en: ['key'],
        },
        1
    )

    rooms[0].addItem(keyItem)

    let g = new Game(events, rooms)
    g.movePlayerCharacterToRoom(rooms[0])
    return g
}

const ge = new GameEngine(initializeNewGame)
ge.run().then(result => {
    console.log(`<DEBUG> Demo script exit ${result}`)
    process.exit(0)
})
