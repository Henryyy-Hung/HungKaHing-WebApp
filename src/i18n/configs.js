// 支持的语言列表
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

// 默认语言
const fallbackLocale = supportedLocales[0];

const I18nSupportedLocales = Object.freeze({
    EN: 'en',
    ZH_HANS: 'zh-Hans',
    ZH_HANT: 'zh-Hant'
});

const I18nNamespace = Object.freeze({
    COMMON: 'common',
    HOME: 'home',
    ABOUT: 'about',
    PROJECTS: 'projects',
    BLOG: 'blog',
    CONTACT: 'contact',
    DISCLAIMER: 'disclaimer',
});

// 本地化资源的命名空间
const namespaces = [
    'common',       // 公共资源（通用组件或元数据）
    'home',         // 首页
    'about',        // 关于
    'projects',     // 项目
    'blog',         // 博客
    'contact',      // 联系
    'disclaimer',   // 免责声明
    'copyright',    // 版权声明
];

// 默认的命名空间
const fallbackNamespace = namespaces[0];

// 语言映射 （在找不到对应的语言资源时，会尝试使用映射的语言资源）
const localeMapping = {
    'zh': 'zh-Hans',
    'zh-CN': 'zh-Hans',
    'zh-SG': 'zh-Hans',
    'zh-MY': 'zh-Hans',
    'zh-TW': 'zh-Hant',
    'zh-HK': 'zh-Hant',
    'zh-MO': 'zh-Hant',
};

const localeRelationship = {
    'zh': ['zh-Hans', 'zh-Hant'],
    'zh-Hans': ['zh-CN', 'zh-SG', 'zh-MY'],
    'zh-Hant': ['zh-TW', 'zh-HK', 'zh-MO'],
}

const getNearestLocale = (locale) => {
    let resultLocale = locale;
    while (!supportedLocales.includes(resultLocale)) {
        for (const key in localeRelationship) {
            if (localeRelationship[key].includes(resultLocale)) {
                resultLocale = key;
                break;
            }
        }
    }
    return resultLocale;
}

// 本地化的语言名称
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

// 获取本地化资源
const getI18nResource = async (language, namespace) => {
    return (await (import(`@/i18n/locales/${localeMapping[language] || language}/${namespace}.json`))).default
}

// 获取合并的本地化资源（将所有命名空间的资源合并）
const getI18nResources = async (language) => {
    const mergedResources = {};
    for (const namespace of namespaces) {
        mergedResources[namespace] = await getI18nResource(language, namespace)
    }
    return mergedResources;
}

export {
    supportedLocales,
    fallbackLocale,
    localeNames,
    getI18nResources
}