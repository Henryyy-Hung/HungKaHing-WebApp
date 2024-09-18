import createMiddleware from 'next-intl/middleware';
import {routing} from '@/i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export const middleware = async (request) => {
    const url = new URL(request.url);
    const origin = url.origin;
    const pathname = url.pathname;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-url', request.url);
    requestHeaders.set('x-origin', origin);
    requestHeaders.set('x-pathname', pathname);
    const response = handleI18nRouting(request);
    // pause for 1s to simulate a slow network
    // await new Promise(resolve => setTimeout(resolve, 3000));
    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         * - sw.js (service worker)
         * - assets (assets)
         * - robots.txt (SEO robots)
         * - sitemap.xml (SEO sitemap)
         * - site.webmanifest (PWA manifest)
         * - _vercel (Vercel deployment files)
         * - .swa (Azure Static Web Apps)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sw.js|assets|robots.txt|sitemap.xml|manifest.webmanifest|_vercel|.swa).*)',
    ]
};