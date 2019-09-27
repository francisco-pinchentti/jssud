/**
 * Utility functions to parse a JSON game data definition file
 */

import { Room } from './Room';
import { InventoryItem } from './InventoryItem';

function parseRooms(roomsJSON) {
    // parse rooms
    const rooms = roomsJSON.map(r => {
        const items = [];
        const events = [];
        return new Room(items, events, r.id, r.description, r.name);
    });

    // parse transitions
    roomsJSON.forEach(r => {
        const sourceRoom = rooms.find(ro => ro.id === r.id);
        if (r.transitions) {
            r.transitions.forEach(t => {
                const destinationRoom = rooms.find(
                    ro => ro.id === t.destination
                );
                if (!destinationRoom) {
                    throw new Error('Invalid datafile');
                }
                sourceRoom.addDestination(destinationRoom, t.commands);
            });
        }

        if (r.items) {
            r.items.forEach(it => {
                const item = new InventoryItem(
                    () => {},
                    it.id,
                    it.description,
                    it.name,
                    it.points
                );
                sourceRoom.addItem(item);
            });
        }
    });

    return rooms;
}

export function parseJSONDatafile(datafile) {
    return {
        rooms: parseRooms(datafile.rooms),
    };
}
