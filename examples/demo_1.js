import { CommandEvent, Room, Game, QuitGameEvent, LookRoomEvent } from "../src";

const events = [
    new CommandEvent(
        (g) => g.printArbitraryMessage('on a custom event'),
        {
            'en': ['custom']
        }
    ),
    new QuitGameEvent(),
    new LookRoomEvent()
]

const rooms = [
    new Room([],[],'r001', {
        'en': ['This is the first room']
    }
    )
]

const g = new Game(events, rooms, 0, null);
g.movePlayerCharacterToRoom(rooms[0]);

g.run().then( () => {
    console.log('Demo script exit');
    process.exit(0);
});
