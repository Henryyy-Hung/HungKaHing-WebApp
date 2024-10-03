"use client"

import styles from "./index.module.css";
import {Link} from "@/i18n/routing"
import LanguageSwitcher from "src/components/nav/LanguageSwitcher";
import React from "react";
import {useLocale, useTranslations} from "next-intl";
import {usePathname} from "@/i18n/routing";
import PathUtil from "@/utils/pathUtil";

const TopNavigationBar = () => {

    const t = useTranslations('common.header');
    const locale = useLocale();
    const pathname = usePathname();

    const navItems = [
        {
            id: "home",
            url: "/"
        },
        {
            id: "about",
            url: "/about"
        },
        {
            id: "projects",
            url: "/projects"
        },
        {
            id: "blog",
            url: "/blog"
        },
        {
            id: "contact",
            url: "/contact"
        }
    ];

    navItems.forEach(item => {
        item.title = t(`labels.${item.id}`);
    });

    const onLinkClick = (e) => {
        if (window !== void 0){
            window.scrollTo(0, 0);
        }
    }

    return (
        <div className={styles.container}>

            <Link className={styles.logo} href={`/`} locale={locale} onClick={onLinkClick} prefetch={false}>
                <h1>{t('title')}</h1>
            </Link>

            <nav className={styles.nav}>
                {
                    navItems.map((item, index) => (
                        <Link
                            key={index}
                            className={`${styles.link} ${PathUtil.startsWith({currentPath: pathname, targetPath: item.url}) ? styles.active : ''}`}
                            href={item.url}
                            locale={locale}
                            onClick={onLinkClick}
                            prefetch={true}
                        >
                            {item.title}
                        </Link>
                    ))
                }
                <LanguageSwitcher
                    className={styles.languageSwitcher}
                />
            </nav>

        </div>
    )
}

export default TopNavigationBar;