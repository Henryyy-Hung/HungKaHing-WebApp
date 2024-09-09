import styles from "./index.module.css";
import {Link} from "@/i18n/routing"
import LanguageSwitcher from "@/components/client/LanguageSwitcher";
import React from "react";
import {useTranslations} from "next-intl";
import {unstable_setRequestLocale} from "next-intl/server";

const TopNavigationBar = ({ locale }) => {

    unstable_setRequestLocale(locale);

    const t = useTranslations('common');

    const navItems = [
        {
            id: "home",
            url: "/"
        },
        {
            id: "resume",
            url: "/resume"
        },
        {
            id: "projects",
            url: "/projects"
        },
        {
            id: "blog",
            url: "/blogs"
        },
        {
            id: "contact",
            url: "/contact"
        }
    ];

    navItems.forEach(item => {
        item.title = t(`header.nav.${item.id}`);
    });

    return (
        <div className={styles.container}>

            <Link className={styles.logo} locale={locale} href={`/`} prefetch={true}>
                <h1>{t('header.title')}</h1>
            </Link>

            <nav className={styles.nav}>
                {
                    navItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <Link href={item.url} locale={locale} prefetch={true}>
                                {item.title}
                            </Link>
                            {
                                index < navItems.length && <>&nbsp;&nbsp;|&nbsp;&nbsp;</>
                            }
                        </React.Fragment>
                    ))
                }
                <LanguageSwitcher currentLanguage={locale}/>
            </nav>
        </div>
    )
}

export default TopNavigationBar;