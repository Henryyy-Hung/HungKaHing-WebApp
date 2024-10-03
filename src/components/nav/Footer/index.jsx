import styles from "./index.module.css";
import Link from "next/link";
import React from "react";
import {useTranslations} from "next-intl";

const Footer = () => {

    const t = useTranslations('common.footer');

    return (
        <div className={styles.container}>
            <div className={styles.contact}>
                <div className={styles.item}>
                    <h3>
                        {t('fields.email.label')}
                    </h3>
                    <Link
                        href={`mailto:${t('fields.email.value')}`}
                        className={styles.value}
                    >
                        {t('fields.email.value')}
                    </Link>
                </div>
                <div className={styles.item}>
                    <h3>
                        {t('fields.location.label')}
                    </h3>
                    <span
                        className={styles.value}
                    >
                        {t('fields.location.value')}
                    </span>
                </div>
                <div className={styles.item}>
                    <h3>
                        {t('fields.social.label')}
                    </h3>
                    <span
                        className={styles.value}
                    >
                        <Link
                            href={t('fields.social.linkedin.value')}
                            target={"_blank"}
                        >
                            {t('fields.social.linkedin.label')}
                        </Link>
                            &nbsp;|&nbsp;
                        <Link
                            href={t('fields.social.github.value')}
                            target={"_blank"}
                        >
                            {t('fields.social.github.label')}
                        </Link>
                    </span>
                </div>
            </div>

            <div className={styles.links}>
                <Link href={'/sitemap.xml'}>
                    {t('labels.sitemap')}
                </Link>
                •
                <Link href={'/copyright'}>
                    {t('labels.copyright')}
                </Link>
                •
                <Link href={'/disclaimer'}>
                    {t('labels.disclaimer')}
                </Link>
            </div>

            <section className={styles.copyright}>
                <p>
                    {t('labels.copyrightNotice')}
                </p>
            </section>
        </div>
    )
}

export default Footer;