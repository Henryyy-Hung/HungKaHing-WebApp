"use client"

import styles from "./index.module.css";
import {usePathname} from "@/i18n/routing";
import { useLocale } from "next-intl";
import {Link} from '@/i18n/routing'
import IconEarth from "@/assets/vectors/IconEarth";
import {i18nService} from "@/i18n/service";
import {I18nLocale} from "@/constants/i18nLocale";

const LanguageSwitcher = ({className, ...props}) => {

    const pathname = usePathname();
    const currentLanguage = useLocale();

    const onLanguageChange = (e, lang) => {
        e.target.blur();
    }

    return (
        <div
            className={`${styles.container} ${className? className : ''}`}
            tabIndex={0}
            {...props}
        >
            <div className={styles.selector}>
                <IconEarth className={styles.icon} />
                <span className={styles.label}>{I18nLocale.getLocaleByIsoCode(currentLanguage).nameInLocal}</span>
                <span className={styles.arrow}></span>
            </div>

            <div className={styles.overlay} tabIndex={1}></div>

            <div className={styles.dropdown}>
                <ul className={styles.menu}>
                    {
                        i18nService.supportedLocales.map((locale, index) => (
                            <li key={index} className={`${styles.option} ${currentLanguage === locale.isoCode ? styles.active : ''}`}>
                                <Link
                                    href={pathname}
                                    locale={locale.isoCode}
                                    scroll={false}
                                    prefetch={false}
                                    onClick={(e) => onLanguageChange(e, locale.isoCode)}
                                >
                                    {locale.nameInLocal}
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