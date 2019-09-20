import { GameTextDictionary } from '../text';

/**
 * @constant DEFAULT_CONSTANTS_DICTIONARY
 */
export const DEFAULT_CONSTANTS_DICTIONARY = {
    commandError: new GameTextDictionary({
        en: ["didn't get that"],
        es: ['no entiendo eso último'],
    }),
    // post basic events callback execution messages:
    onTurn: new GameTextDictionary({
        en: ['\t on turn'],
        es: ['\t en el turno'],
    }),
    onExit: new GameTextDictionary({
        en: ['Goodbye\n'],
        es: ['Adios\n'],
    }),
    onLookRoom: new GameTextDictionary({
        en: ['here you see'],
        es: ['aquí puedes ver'],
    }),
    onLoad: new GameTextDictionary({
        en: ['welcome back'],
        es: ['bienvenido nuevamente'],
    }),
    // basic commands dictionaries:
    use: {
        en: ['use', 'u'],
        es: ['usar', 'u'],
    },
    pickUp: {
        en: ['take', 'grab', 'pick up'],
        es: ['coger', 'agarrar', 'tomar'],
    },
    look: {
        en: ['l', 'look', 'examine'],
        es: ['mirar', 'examinar', 'ver'],
    },
};
