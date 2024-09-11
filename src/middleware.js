import createMiddleware from 'next-intl/middleware';
import {routing} from '@/i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export const middleware = (request) => {
    const start = Date.now();
    const response = handleI18nRouting(request);
    const end = Date.now();
    response.headers.set('X-Response-Time', `${end - start}ms`);
    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|_vercel|assets|favicon.ico|sw.js|sitemap|site.webmanifest|.swa).*)',
    ]
};