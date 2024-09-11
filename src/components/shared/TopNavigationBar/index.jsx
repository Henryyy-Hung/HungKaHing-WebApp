"use client"

import styles from "./index.module.css";
import {Link} from "@/i18n/routing"
import LanguageSwitcher from "@/components/client/LanguageSwitcher";
import React from "react";
import {useTranslations} from "next-intl";

const TopNavigationBar = ({ locale }) => {

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

    const onLinkClick = (e) => {
        if (window !== void 0){
            window.scrollTo(0, 0);
        }
    }

    return (
        <div className={styles.container}>

            <Link className={styles.logo} href={`/`} locale={locale} onClick={onLinkClick}>
                <h1>{t('header.title')}</h1>
            </Link>

            <nav className={styles.nav}>
                {
                    navItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <Link className={styles.link} href={item.url} locale={locale} onClick={onLinkClick}>
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