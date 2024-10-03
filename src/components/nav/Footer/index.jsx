import styles from "./index.module.css";
import React from "react";
import {Link} from '@/i18n/routing'
import {useLocale, useTranslations} from "next-intl";

const Footer = () => {

    const locale = useLocale();
    const t = useTranslations('common.footer');

    return (
        <div className={styles.container}>
            <div className={styles.contact}>
                <div className={styles.item}>
                    <h3>
                        {t('fields.email.title')}
                    </h3>
                    <Link
                        href={`mailto:${t('fields.email.content')}`}
                        className={styles.content}
                    >
                        {t('fields.email.content')}
                    </Link>
                </div>
                <div className={styles.item}>
                    <h3>
                        {t('fields.location.title')}
                    </h3>
                    <span
                        className={styles.content}
                    >
                        {t('fields.location.content')}
                    </span>
                </div>
                <div className={styles.item}>
                    <h3>
                        {t('fields.social.title')}
                    </h3>
                    <span
                        className={styles.content}
                    >
                        <Link
                            href={t('fields.social.linkedin.content')}
                            target={"_blank"}
                        >
                            {t('fields.social.linkedin.title')}
                        </Link>
                            &nbsp;|&nbsp;
                        <Link
                            href={t('fields.social.github.content')}
                            target={"_blank"}
                        >
                            {t('fields.social.github.title')}
                        </Link>
                    </span>
                </div>
            </div>

            <div className={styles.links}>
                <a href={'/sitemap.xml'}>
                    {t('labels.sitemap')}
                </a>
                •
                <Link href={'/copyright'} locale={locale}>
                    {t('labels.copyright')}
                </Link>
                •
                <Link href={'/disclaimer'} locale={locale}>
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