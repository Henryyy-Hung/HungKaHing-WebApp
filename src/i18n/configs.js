const cookieName = "i18n";

const supportedLocales  = [
    'en',
    'zh-Hans',
    'zh-Hant',
    // 'zh',
    // 'zh-CN',
    // 'zh-SG',
    // 'zh-MY',
    // 'zh-TW',
    // 'zh-HK',
    // 'zh-MO',
]

const fallbackLocale = supportedLocales[0];

const localeMapping = {
    'zh': 'zh-Hans',
    'zh-CN': 'zh-Hans',
    'zh-SG': 'zh-Hans',
    'zh-MY': 'zh-Hans',
    'zh-TW': 'zh-Hant',
    'zh-HK': 'zh-Hant',
    'zh-MO': 'zh-Hant',
};

const localeNames = {
    'en': 'English',
    'zh-Hans': '简体中文',
    'zh-Hant': '繁體中文',
    'zh': '中文',
    'zh-CN': '中文(中国)',
    'zh-SG': '中文(新加坡)',
    'zh-MY': '中文(马来西亚)',
    'zh-TW': '中文(台湾)',
    'zh-HK': '中文(香港)',
    'zh-MO': '中文(澳门)',
};

const namespaces = [
    'common',
    'home'
];

const fallbackNamespace = namespaces[0];

const getI18nResource = async (language, namespace) => {
    return (await (import(`@/i18n/locales/${localeMapping[language] || language}/${namespace}.json`))).default
}

const getMergedI18nResource = async (language) => {
    const mergedResources = {};
    for (const namespace of namespaces) {
        mergedResources[namespace] = await getI18nResource(language, namespace)
    }
    return mergedResources;
}

export {
    cookieName,
    supportedLocales,
    fallbackLocale,
    localeMapping,
    namespaces,
    fallbackNamespace,
    localeNames,
    getMergedI18nResource
}