import "../globals.css";
import styles from "./layout.module.css";
import localFont from 'next/font/local';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {getLangDir} from 'rtl-detect';
import {supportedLocales} from "@/i18n/configs";
import StyleSheetService from "@/services/styleSheetService";
import TopNavigationBar from "src/components/TopNavigationBar";
import Footer from "src/components/Footer";

const satoshiVariable = localFont({ src: '../../assets/fonts/Satoshi/Satoshi-Variable.woff2' });

const generateViewport = async ({params: {locale}}) => {
    return {
        themeColor: '#ffffff',
    }
}

const generateMetadata = async ({params: {locale}}) => {

    const t = await getTranslations({locale, namespace: 'common.metadata'});

    return {
        applicationName: 'Henry Hung',
        title: {
            template: `%s | Henry Hung`,
            default: 'Henry Hung',
        },
        description: "Henry's Personal Website",
        category: 'technology',
        generator: 'Next.js',
        referrer: 'origin-when-cross-origin',
        keywords: [
            'Hung Ka Hing',
            'Henry Hung',
            'Personal Website',
            '洪嘉庆'
        ],
        authors: [
            {
                name: 'Henry Hung',
                url: 'https://hungkahing.com'
            }
        ],
        creator: 'Henry Hung',
        publisher: 'Henry Hung',
        formatDetection: { email: false,  address: false, telephone: false, },
        metadataBase: new URL('https://hungkahing.com'),
        alternates: {
            canonical: '/',
            languages: Object.fromEntries(supportedLocales.map(locale => [locale, `/${locale}`])),
        },
        icons: {
            shortcut: ['/assets/favicon.ico'],
            icon: [
                {
                    type: "image/png",
                    sizes: "16x16",
                    url: '/assets/favicon-16x16.png'
                },
                {
                    type: "image/png",
                    sizes: "32x32",
                    url: '/assets/favicon-32x32.png'
                },
            ],
            apple: [
                {
                    url: '/assets/apple-touch-icon.png',
                    sizes: '180x180',
                    type: 'image/png'
                },
            ],
            other: {
                rel: 'apple-touch-icon-precomposed',
                url: '/assets/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        },
        openGraph: {
            title: 'Henry',
            description: 'Henry\'s Personal Website (openGraph)',
            type: 'website',
            publishedTime: new Date().toISOString(),
            authors: ['Henry Hung'],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Henry',
            description: 'Henry\'s Personal Website (openGraph)',
            siteId: '1467726470533754880',
            creator: '@khhung',
            creatorId: '1467726470533754880',
            images: ['https://nextjs.org/og.png'], // Must be an absolute URL
        },
        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: false,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

const generateStaticParams = async () => {
    return supportedLocales.map(locale => ({locale}));
}

const Layout = async ({ children, params: {locale} }) => {

    // 加载所有的 CSS 模块
    await StyleSheetService.loadAllCss();
    // 确保在服务端渲染时，locale 与请求的 locale 一致
    unstable_setRequestLocale(locale);
    // 获取当前 locale 的翻译资源
    const messages = await getMessages();
    // 获取当前 locale 的文本方向
    const direction = getLangDir(locale);

    return (
        <html lang={locale} dir={direction}>
            <body className={`${satoshiVariable.className} ${styles.container}`}>
                <NextIntlClientProvider messages={messages}>
                    <header className={styles.header}>
                        <TopNavigationBar locale={locale}/>
                    </header>
                    <main className={styles.main}>
                        {children}
                    </main>
                    <footer className={styles.footer}>
                        <Footer locale={locale}/>
                    </footer>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};

export {
    generateViewport,
    generateMetadata,
    generateStaticParams,
};

export default Layout;
