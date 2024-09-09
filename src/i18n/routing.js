import {defineRouting} from 'next-intl/routing';
import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import {supportedLocales, fallbackLocale} from "@/i18n/configs";

const routing = defineRouting({
    locales: supportedLocales,
    defaultLocale: fallbackLocale,
    localePrefix: 'as-needed'
});

const {Link, redirect, usePathname, useRouter} = createSharedPathnamesNavigation(routing);

export {
    Link,
    redirect,
    usePathname,
    useRouter,
    routing
};
