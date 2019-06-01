import { GameTextDictionary } from "./text/GameTextDictionary";

export class GameCompoundSentence {
    constructor(verbs, connectors) {
        this.verbs = new GameTextDictionary(verbs)
        this.connectors = new GameTextDictionary(connectors)
    }

    mapWithSingleNounForGivenLanguage(lang, noun, optionalConnector) {
        const verbs = this.verbs.getForLanguage(lang)
        const connectors = this.connectors.getForLanguage(lang)
        const mapResults = []

        verbs.forEach(v => {
            connectors.forEach(c => {
                mapResults.push(`${v} ${c} ${noun}`)
                if (optionalConnector) {
                    mapResults.push(`${v} ${noun}`)
                }
            })
        })

        return mapResults
    }

    mapWithTwoNounsForGivenLanguage(lang, nounA, nounB) {
        const verbs = this.verbs.getForLanguage(lang)
        const connectors = this.connectors.getForLanguage(lang)
        const mapResults = []

        verbs.forEach(v => {
            connectors.forEach(c => {
                mapResults.push(`${v} ${nounA} ${c} ${nounB}`)
                mapResults.push(`${v} ${nounB} ${c} ${nounA}`)
            })
        })

        return mapResults
    }
}

const takeDict = {
    en: ['take', 'grab', 'get'],
}

const useDict = {
    en: ['use', 'activate'],
}

const lookDict = {
    en: ['look', 'examine', 'l'],
}

const combineVerbDictionary = {
    en: ['combine', 'merge', 'fuse'],
}

const combineConnectorDictionary = {
    en: ['with', 'along with'],
}

const lookAtVerbDictionary = {
    en: ['look', 'examine', 'l'],
}

const lookAtConnectorDictionary = {
    en: ['at', 'on', 'onto'],
}

const GameDictionary = {
    take: new GameTextDictionary(takeDict),
    use: new GameTextDictionary(useDict),
    combine: new GameCompoundSentence(
        combineVerbDictionary,
        combineConnectorDictionary
    ),
    look: new GameTextDictionary(lookDict),
    lookAt: new GameCompoundSentence(
        lookAtVerbDictionary,
        lookAtConnectorDictionary
    ),
}

console.log(GameDictionary.lookAt.mapWithSingleNounForGivenLanguage('en', 'TEST_LOOK_NOUN'));

/**
 * @todo review name, location
 * @constant DEFAULT_CONSTANTS_DICTIONARY
 */
const DEFAULT_CONSTANTS_DICTIONARY = {
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
}