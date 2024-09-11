"use client";

import styles from "./index.module.css";
import {supportedLocales, localeNames} from "@/i18n/configs";
import {usePathname} from "@/i18n/routing";
import { useLocale } from "next-intl";
import {Link} from '@/i18n/routing'

const LanguageSwitcher = () => {

    const pathname = usePathname();
    const currentLanguage = useLocale();

    const onLanguageChange = (e, lang) => {
        e.target.blur();
    }

    return (
        <div className={styles.container} tabIndex="0">
            <button className={styles.button}>
                {localeNames[currentLanguage]}
                <span className={styles.arrow}></span>
            </button>
            <div className={styles.overlay} tabIndex="1"></div>
            <div className={styles.dropdown}>
                <ul className={styles.menu}>
                    {
                        supportedLocales.map((lang, index) => (
                            (localeNames[lang]) &&
                            <li key={index} className={`${styles.option} ${currentLanguage === lang ? styles.active : ''}`}>
                                <Link href={pathname} locale={lang} scroll={false} onClick={(e) => onLanguageChange(e, lang)}>
                                    {localeNames[lang]}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default LanguageSwitcher;