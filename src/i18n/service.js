import {I18nNamespace} from "src/constants/i18nNamespace";
import {I18nLocale} from "src/constants/i18nLocale";

class I18nService {

    constructor() {
        this.supportedLocales = I18nLocale.enumValues;
        this.fallbackLocale = I18nLocale.EN;
        this.supportedNamespaces = I18nNamespace.enumValues;
    }

    get isoCodeOfSupportedLocales() {
        return this.supportedLocales
            .map(locale => locale?.isoCode)
            .filter(isoCode => typeof isoCode === 'string');
    }

    get isoCodeOfFallbackLocale() {
        return this.fallbackLocale.isoCode;
    }

    #getResource = async (localeIsoCode, namespaceIdentifier) => {
        while (true) {
            try {
                const resource = (await (import(`src/i18n/locales/${localeIsoCode}/${namespaceIdentifier}.json`))).default;
                if (resource) return resource;
            } catch (e) {
                const locale = I18nLocale.getLocaleByIsoCode(localeIsoCode);
                const fallbackLocaleIsoCode = locale?.isoCodeOfFallbackLocale || null;
                if (! fallbackLocaleIsoCode) break;
                localeIsoCode = fallbackLocaleIsoCode;
            }
        }
        return {};
    }

    getResources = async (locale) => {
        const mergedResources = {};
        for (const namespace of this.supportedNamespaces) {
            const identifier = namespace.id;
            const messages = await this.#getResource(locale, identifier);
            mergedResources[identifier] = messages ? messages : {};
        }
        return mergedResources;
    }
}

const i18nService = new I18nService();

export {
    i18nService
}