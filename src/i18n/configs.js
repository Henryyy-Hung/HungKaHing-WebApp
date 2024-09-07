const cookieName = "i18n";

const languages  = [
    'en',
    'zh-Hans',
    'zh-Hant',
    'zh',
    'zh-CN',
    'zh-SG',
    'zh-MY',
    'zh-TW',
    'zh-HK',
    'zh-MO',
]

const fallbackLanguage = languages[0];

const languageMapping = {
    'zh': 'zh-Hans',
    'zh-CN': 'zh-Hans',
    'zh-SG': 'zh-Hans',
    'zh-MY': 'zh-Hans',
    'zh-TW': 'zh-Hant',
    'zh-HK': 'zh-Hant',
    'zh-MO': 'zh-Hant',
};

const languageNames = {
    'en': 'English',
    'zh-Hans': '简体中文',
    'zh-Hant': '繁體中文',
    // 'zh': '中文',
    // 'zh-CN': '中文（中国）',
    // 'zh-SG': '中文（新加坡）',
    // 'zh-MY': '中文（马来西亚）',
    // 'zh-TW': '中文（台湾）',
    // 'zh-HK': '中文（香港）',
    // 'zh-MO': '中文（澳门）',
};

const namespaces = [
    'translation',
];

const fallbackNamespace = namespaces[0];

const getI18nOptions = (language=fallbackLanguage, namespace=fallbackNamespace) => {
    return {
        supportedLngs: languages,
        fallbackLng: fallbackLanguage,
        lng: language,
        fallbackNS: fallbackNamespace,
        defaultNS: namespace,
        ns: namespaces,
    }
}

const getI18nResource = async (language, namespace) => {
    return (await (import(`@/i18n/locales/${languageMapping[language] || language}/${namespace}.json`))).default
}

export {
    cookieName,
    languages,
    fallbackLanguage,
    languageMapping,
    namespaces,
    fallbackNamespace,
    getI18nOptions,
    getI18nResource,
    languageNames
}