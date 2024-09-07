import styles from "./index.module.css";
import {languages, languageNames} from "@/i18n/configs";
import Link from "next/link";

const LanguageSwitcher = ({ currentLanguage }) => {

    return (
        <div className={styles.container}>
            <div className={styles.button} tabIndex="0">
                {languageNames[currentLanguage]}
                <span className={styles.arrow}></span>
                <ul className={styles.dropdown}>
                    {
                        languages.map((lang, index) => (
                            (languageNames[lang]) &&
                            <li key={index} className={`${styles.dropdownOption} ${currentLanguage === lang ? styles.active : ''}`}>
                                <Link href={`/${lang}`}>
                                    {languageNames[lang]}
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