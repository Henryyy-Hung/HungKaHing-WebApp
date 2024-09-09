import "../globals.css";
import styles from "./layout.module.css";
import localFont from 'next/font/local';
import {supportedLocales} from "@/i18n/configs";
import TopNavigationBar from "@/components/shared/TopNavigationBar";
import Footer from "@/components/shared/Footer";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {getLangDir} from 'rtl-detect';

const satoshiVariable = localFont({ src: '../../assets/fonts/Satoshi/Satoshi-Variable.woff2' });
const fangzheng = localFont({ src: '../../assets/fonts/Fangzheng/FangzhengPingxianLantingSong_GBK.ttf' });

const generateMetadata = async ({params: {locale}}) => {

    const t = await getTranslations({locale, namespace: 'common.metadata'});

    return {
        title: t('title'),
        description: "Generated by create next app",
    };
}

const generateStaticParams = async () => {
    return supportedLocales.map(locale => ({locale}));
}

const RootLayout = async ({ children, params: {locale} }) => {

    unstable_setRequestLocale(locale);

    const messages = await getMessages();
    const direction = getLangDir(locale);
    const fontClass = locale.startsWith('zh') ? fangzheng.className : satoshiVariable.className;

    return (
        <html lang={locale} dir={direction}>
            <body className={fontClass}>
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
                    <div className={`${fangzheng.className} ${satoshiVariable.className}`}></div>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};

export {
    generateMetadata,
    generateStaticParams,
};

export default RootLayout;

