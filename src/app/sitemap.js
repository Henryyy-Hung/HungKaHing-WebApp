import {fallbackLocale, supportedLocales} from "@/i18n/configs";

const host = 'https://hungkahing.com';

export default function sitemap() {
    return [
        getEntry('/'),
        getEntry('/blogs'),
        getEntry('/resume'),
        getEntry('/project')
    ];
}

function getUrl(pathname, locale) {
    return `${host}/${locale}${pathname === '/' ? '' : pathname}`;
}

function getEntry(pathname) {
    return {
        url: getUrl(pathname, fallbackLocale),
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
        alternates: {
            languages: Object.fromEntries(
                supportedLocales.map((locale) => [locale, getUrl(pathname, locale)])
            )
        }
    };
}
