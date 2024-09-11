import "../globals.css";
import styles from "./layout.module.css";
import localFont from 'next/font/local';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {getLangDir} from 'rtl-detect';
import {supportedLocales} from "@/i18n/configs";
import TopNavigationBar from "@/components/shared/TopNavigationBar";
import Footer from "@/components/shared/Footer";
import {Suspense} from "react";

const satoshiVariable = localFont({ src: '../../assets/fonts/Satoshi/Satoshi-Variable.woff2' });

const generateStaticParams = async () => {
    return supportedLocales.map(locale => ({locale}));
}

const generateMetadata = async ({params: {locale}}) => {
    const t = await getTranslations({locale, namespace: 'common.metadata'});
    return {
        title: t('title'),
        description: "Generated by create next app",
    };
}

const Layout = async ({ children, params: {locale} }) => {

    unstable_setRequestLocale(locale);
    const messages = await getMessages();
    const direction = getLangDir(locale);

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
