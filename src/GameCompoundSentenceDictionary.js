export class GameCompoundSentenceDictionary {
    constructor(verbs, connectors) {
        this.verbs = new GameObjectDictionary(verbs)
        this.connectors = new GameObjectDictionary(connectors)
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
    take: new GameObjectDictionary(takeDict),
    use: new GameObjectDictionary(useDict),
    combine: new GameCompoundSentenceDictionary(
        combineVerbDictionary,
        combineConnectorDictionary
    ),
    look: new GameObjectDictionary(lookDict),
    lookAt: new GameCompoundSentenceDictionary(
        lookAtVerbDictionary,
        lookAtConnectorDictionary
    ),
}
