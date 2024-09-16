import "../globals.css";
import styles from "./layout.module.css";
import localFont from 'next/font/local';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {getLangDir} from 'rtl-detect';
import {supportedLocales} from "@/i18n/configs";
import TopNavigationBar from "src/components/TopNavigationBar";
import Footer from "src/components/Footer";
import {globby} from "globby";
import StyleSheetService from "@/services/styleSheetService";

const satoshiVariable = localFont({ src: '../../assets/fonts/Satoshi/Satoshi-Variable.woff2' });

const generateStaticParams = async () => {
    return supportedLocales.map(locale => ({locale}));
}

const generateMetadata = async ({params: {locale}}) => {

    const t = await getTranslations({locale, namespace: 'common.metadata'});

    return {
        title: {
            template: `%s | Henry Hung`,
            default: 'Henry Hung',
        },
        description: "Henry's Personal Website",
        applicationName: 'Henry Hung',
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
        },
    };
}

const Layout = async ({ children, params: {locale} }) => {

    // 确保在服务端渲染时，locale 与请求的 locale 一致
    unstable_setRequestLocale(locale);
    // 获取当前 locale 的翻译资源
    const messages = await getMessages();
    // 获取当前 locale 的文本方向
    const direction = getLangDir(locale);
    // 加载所有的 CSS 模块
    await StyleSheetService.loadAllCss();

    return (
        <html lang={locale} dir={direction}>
            <body className={satoshiVariable.className}>
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
    generateMetadata,
    generateStaticParams,
};

export default Layout;
