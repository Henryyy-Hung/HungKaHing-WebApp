import {i18nService} from "@/i18n/service";

const host = 'https://hungkahing.com';

export default function sitemap() {
    return [
        getEntry('/'),
        getEntry('/blogs'),
        getEntry('/about'),
        getEntry('/project')
    ];
}

function getUrl(pathname, locale) {
    return `${host}${locale? `/${locale}` : ''}${pathname === '/' ? '' : pathname}`;
}

function getEntry(pathname) {
    return {
        url: getUrl(pathname, null),
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
        alternates: {
            languages: Object.fromEntries(
                i18nService.isoCodeOfSupportedLocales.map((locale) => [locale, getUrl(pathname, locale)])
            )
        }
    };
}
