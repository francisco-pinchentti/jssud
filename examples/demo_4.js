/**
 * jssud demo # 4
 *
 *  - parse a json datafile
 *  - i18n
 *  - @todo add custom local events
 *  - @todo add items
 */

import {
    QuitGameEvent,
    LookRoomEvent,
    ShowScoreEvent,
    SaveGameEvent,
    LoadGameEvent,
    CLIGame,
    CLIGameEngine,
    parseJSONDatafile,
} from '../src';

const datafile = require('./demo_4.json');

/**
 * Creates a new Game instance
 *
 * @returns {Game} a new game object
 */
function initializeNewGame() {
    const events = [
        new QuitGameEvent(),
        new LookRoomEvent(),
        new ShowScoreEvent(),
        new SaveGameEvent(),
        new LoadGameEvent(),
    ];

    const parsed = parseJSONDatafile(datafile);
    const g = new CLIGame(events, parsed.rooms);
    g.movePlayerCharacterToRoom(parsed.rooms[0]);
    return g;
}

const ge = new CLIGameEngine(initializeNewGame);
ge.run().then(result => {
    process.exit(0);
});
