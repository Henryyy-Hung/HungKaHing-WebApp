import styles from "./index.module.css";
import Link from "next/link";
import React from "react";
import {unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";

const Footer = ({locale}) => {

    unstable_setRequestLocale(locale);

    const t = useTranslations('common.footer');

    return (
        <div className={styles.container}>
            <section className={styles.contact}>
                <div>
                    <h5>{t('contacts.email.title')}</h5>
                    <Link href={`mailto:${t('contacts.email.value')}`}>{t('contacts.email.value')}</Link>
                </div>
                <div>
                    <h5>{t('contacts.location.title')}</h5>
                    <span>{t('contacts.location.value')}</span>
                </div>
                <div>
                    <h5>{t('social.title')}</h5>
                    <Link href={t('social.linkedin.url')} target={"_blank"}>{t('social.linkedin.title')}</Link>
                    &nbsp;|&nbsp;
                    <Link href={t('social.github.url')} target={"_blank"}>{t('social.github.title')}</Link>
                </div>
            </section>
            <section className={styles.copyright}>
                <p>{t('copyRight')}</p>
            </section>
        </div>
    )
}

export default Footer;