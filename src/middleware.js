import { NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// 定义支持的语言环境和默认语言环境
let locales = ['en', 'zh'];
let defaultLocale = 'en';

const cookieName = "i18nlang";

const languageMapping = {
    'zh': 'zh-Hans',
    'zh-CN': 'zh-Hans',
    'zh-SG': 'zh-Hans',
    'zh-MY': 'zh-Hans',
    'zh-TW': 'zh-Hant',
    'zh-HK': 'zh-Hant',
    'zh-MO': 'zh-Hant',
};

// 获取客户端首选语言环境
function getLocale(request) {
    // 从 cookie 中获取语言环境
    if (request.cookies.has(cookieName)) {
        const cookieValue = request.cookies.get(cookieName);
        if (locales.includes(cookieValue)) {
            return cookieValue;
        }
    }
    // 从请求头中获取 'accept-language' 信息
    const acceptLanguageHeader = request.headers.get('accept-language');
    const negotiator = new Negotiator({ headers: { 'accept-language': acceptLanguageHeader } });
    let languages = negotiator.languages();
    // 如果没有首选语言，则使用默认语言
    languages = languages.filter((language) => language !== '*');
    // 使用 match 函数从首选语言中选择最佳匹配的语言环境
    return match(languages, locales, defaultLocale);
}

// 中间件主函数
export function middleware(request) {
    // 获取 URL 路径
    const { pathname } = request.nextUrl;

    // 检查 URL 路径中是否已包含任何支持的语言环境
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    // 如果路径已经包含语言环境，则不进行重定向
    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    // 获取首选的语言环境
    const locale = getLocale(request);

    // 构建新的 URL 路径
    request.nextUrl.pathname = `/${locale}${pathname}`;

    // 设置 cookie
    request.cookies.set(cookieName, locale, {
        // 设置 cookie 的有效期为 1 年
        maxAge: 365 * 24 * 60 * 60,
        // 设置 cookie 为 SameSite 属性
        sameSite: 'Strict',
        // 设置 cookie 为 HttpOnly 属性
        httpOnly: true,
    });

    // 重定向到新的 URL
    return NextResponse.redirect(request.nextUrl);
}

// 配置中间件匹配路径
export const config = {
    matcher: [
        // 忽略所有内部路径 (_next)
        '/((?!_next).*)',
        // 可选：仅在根路径 (/) URL 上运行
        // '/'
    ],
};