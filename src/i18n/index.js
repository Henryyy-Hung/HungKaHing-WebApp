import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { languageMapping, getI18nOptions, getI18nResource } from './configs'

const initI18next = async (language, namespace) => {
    const i18nInstance = createInstance()
    await i18nInstance
        .use(initReactI18next)
        .use(resourcesToBackend(getI18nResource))
        .init(getI18nOptions(language, namespace))
    return i18nInstance
}

const useTranslation = async (language, namespace=null, options = {}) => {
    const i18nextInstance = await initI18next(language, namespace)
    return {
        t: i18nextInstance.getFixedT(
            language,
            Array.isArray(namespace) ? namespace[0] : namespace,
            options.keyPrefix
        ),
        i18n: i18nextInstance
    }
}

export {
    useTranslation
}
