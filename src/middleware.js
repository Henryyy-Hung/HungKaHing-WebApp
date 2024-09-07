import { NextResponse } from 'next/server';
import acceptLanguage from 'accept-language'
import { fallbackLanguage, languages, cookieName } from '@/i18n/configs'

acceptLanguage.languages(languages)

const getLanguage = (request) => {
    // 从请求中获取 cookie
    const cookieLanguage = request.cookies.get(cookieName)?.value;
    // 如果 cookie 存在，则返回 cookie 中的语言环境
    if (cookieLanguage && languages.includes(cookieLanguage)) {
        return cookieLanguage;
    }
    // 从请求头中获取 'accept-language' 信息
    const acceptLanguageHeader = request.headers.get('accept-language');
    return acceptLanguage.get(acceptLanguageHeader) || fallbackLanguage;
}

// 中间件主函数
export function middleware(request) {
    let response;
    let language;
    // 获取 URL 路径
    const { pathname } = request.nextUrl;
    // 检查 URL 路径中是否已包含任何支持的语言环境
    const pathnameHasLanguage = languages.some(
        (language) => pathname.startsWith(`/${language}/`) || pathname === `/${language}`
    );
    // 如果路径已经包含语言环境，则不进行重定向
    if (pathnameHasLanguage) {
        response = NextResponse.next();
        language = pathname.split('/')[1];
    } else {
        // 获取首选的语言环境
        language = getLanguage(request);
        // 构建新的 URL 路径
        request.nextUrl.pathname = `/${language}${pathname}`;
        // 重定向到新的 URL
        response = NextResponse.redirect(request.nextUrl);
    }
    response.cookies.set(cookieName, language);
    return response;
}

// 配置中间件匹配路径
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest|.swa).*)'
    ]
}