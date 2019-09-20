import {
    Room,
    Game,
    InventoryItem,
    GameEngine,
    GameTextDictionary,
} from '../src'
import {
    CommandEvent,
    ChangeLanguageEvent,
    QuitGameEvent,
    LookRoomEvent,
    ShowScoreEvent,
    LoadGameEvent,
    SaveGameEvent,
} from '../src/events'

/**
 * Demo 2: i18n
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
        new LoadGameEvent({
            en: ['load', 'loadgame'],
            es: ['cargar', 'restaurar'],
        }),
        new SaveGameEvent({
            en: ['save', 'savegame'],
            es: ['salvar', 'guardar'],
        }),
    ]

    const rooms = [
        new Room(
            [],
            [
                new CommandEvent(
                    game =>
                        game.printLocalizedMessage(
                            new GameTextDictionary({
                                en: ['the door seems to be locked'],
                                es: ['la puerta parece estar cerrada'],
                            })
                        ),
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
            const lockedRoomEvent = rooms[0]
                .getEvents()
                .find(evt => evt.id === 'ce002')
            if (lockedRoomEvent) {
                game.printLocalizedMessage(
                    new GameTextDictionary({
                        en: ['You open the door to the north...'],
                        es: ['Abres la puerta hacia el norte...'],
                    })
                )
                rooms[0].removeEvent(lockedRoomEvent)
                rooms[0].addDestination(rooms[1], {
                    en: ['go north', 'north', 'n'],
                    es: ['ir al norte', 'norte', 'n'],
                })
            } else {
                game.printLocalizedMessage(
                    new GameTextDictionary({
                        en: ['It seems it cannot be used here...'],
                        es: ['Aparentemente no puede usarse aquí...'],
                    })
                )
            }
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

    const g = new Game(events, rooms, ['en', 'es'], 'en')
    g.movePlayerCharacterToRoom(rooms[0])

    return g
}

const ge = new GameEngine(initializeNewGame)
ge.run().then(result => {
    console.log(`<DEBUG> Demo script exit ${result}`)
    process.exit(0)
})
