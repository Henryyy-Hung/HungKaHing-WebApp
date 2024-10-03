import {defineRouting} from 'next-intl/routing';
import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import {supportedLocales, fallbackLocale} from "@/i18n/configs";

// 定义路由
const routing = defineRouting({
    locales: supportedLocales,
    defaultLocale: fallbackLocale,
    localePrefix: 'as-needed'    // 在默认语言下，不显示语言前缀
});

// 本地化的路由导航
const {Link, redirect, usePathname, useRouter} = createSharedPathnamesNavigation(routing);

export {
    Link,
    redirect,
    usePathname,
    useRouter,
    routing
};
