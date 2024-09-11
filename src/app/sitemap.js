import {supportedLocales, fallbackLocale} from "@/i18n/configs";

const host = 'https://example.com';

export default function sitemap() {
    const result =  [
        getEntry('/'),
        getEntry('/blogs'),
        getEntry('/resume'),
        getEntry('/project')
    ];
    console.log(JSON.stringify(result, null, 4));
    return result;
}

function getEntry(pathname) {
    return {
        url: getUrl(pathname, fallbackLocale),
        lastModified: new Date(),
        alternates: {
            languages: Object.fromEntries(
                supportedLocales.map((locale) => [locale, getUrl(pathname, locale)])
            )
        }
    };
}

function getUrl(pathname, locale) {
    return `${host}/${locale}${pathname === '/' ? '' : pathname}`;
}