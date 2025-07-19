import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
import {i18nService} from 'src/i18n/service';

// 定义路由
const routing = defineRouting({
    // 支持的语言列表
    locales: i18nService.isoCodeOfSupportedLocales,
    // 默认语言
    defaultLocale: i18nService.isoCodeOfFallbackLocale,
    // 在默认语言下，不显示语言前缀
    localePrefix: {
        mode: 'as-needed',
        // prefixes: i18nService.supportedLocales.reduce((acc, locale) => {
        //     acc[locale.isoCode] = "/" + locale.nameInLocal;
        //     return acc;
        // }, {}),
    },
    pathnames: {
        // '/': '/',
        // '/about': {
        //     'en': '/about',
        //     'zh-Hans': '/关于'
        // }
    }
});

// 本地化的路由导航
const {Link, redirect, usePathname, useRouter} = createNavigation(routing);

export {
    Link,
    redirect,
    usePathname,
    useRouter,
    routing
};
