import { Room, Game, InventoryItem } from '../src'
import {
    CommandEvent,
    ChangeLanguageEvent,
    QuitGameEvent,
    LookRoomEvent,
    ShowScoreEvent,
} from '../src/events'

/**
 * Demo 2: i18n
 */

const events = [
    new CommandEvent(
        game => game.printArbitraryMessage('on a custom event'),
        {
            en: ['custom', 'cc', 'cu'],
            es: ['cu', 'personalizado'],
        },
        'ce001'
    ),
    new QuitGameEvent({ en: ['quit', 'q'], es: ['salir', 'q'] }),
    new LookRoomEvent({ en: ['look', 'l'], es: ['mirar', 'ver'] }),
    new ShowScoreEvent(
        { en: ['score', 'ss'], es: ['puntos', 'puntaje'] },
        { en: ['your score is %1'], es: ['su puntaje es %1'] }
    ),
    new ChangeLanguageEvent(),
]

const rooms = [
    new Room(
        [],
        [
            new CommandEvent(
                game =>
                    game.printArbitraryMessage('the door seems to be locked'),
                {
                    en: ['go north', 'north', 'n'],
                    es: ['ir al norte', 'norte', 'n'],
                },
                'ce002'
            ),
        ],
        'r001',
        {
            en: ['Room 1: You see a door to the north'],
            es: ['Sala 1: Ves una puerta hacia el norte'],
        }
    ),
    new Room([], [], 'r002', {
        en: ['Room 2: This is the second room'],
        es: ['Sala 2: Esta es la segunda habitación'],
    }),
]

const keyItem = new InventoryItem(
    game => {
        game.printArbitraryMessage('You open the door to the north...')
        const lockedRoomEvent = rooms[0]
            .getEvents()
            .find(evt => evt.id === 'ce002')
        rooms[0].removeEvent(lockedRoomEvent)
        rooms[0].addDestination(rooms[1], {
            en: ['go north', 'north', 'n'],
            es: ['ir al norte', 'norte', 'n'],
        })
    },
    'it001',
    {
        en: ['an iron key'],
        es: ['una llave de hierro'],
    },
    {
        en: ['key'],
        es: ['llave'],
    },
    1
)

rooms[0].addItem(keyItem)

const g = new Game(events, rooms, 0, null)
g.movePlayerCharacterToRoom(rooms[0])

g.run().then(() => {
    console.log('<=== Demo script exit ===>')
    process.exit(0)
})
