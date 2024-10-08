import styles from './page.module.css';
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";

export const generateMetadata = async ({params: {locale}}) => {
    const t = await getTranslations({locale, namespace: 'copyright'});
    return {
        title: t('title'),
    };
}

const CopyrightPage = ({ params: { locale } }) => {

    unstable_setRequestLocale(locale);

    const t = useTranslations('copyright');

    const fieldIds = [
        'copyrightStatement',
        'authorization',
        'infringement',
        'liability',
        'modification',
    ]

    const fields = fieldIds.map((fieldId) => {
        return {
            title: t(`fields.${fieldId}.title`),
            content: t(`fields.${fieldId}.content`),
        }
    });

    return (
        <>
            <h2>{t('title')}</h2>
            <ol>
                {
                    fields.map((field, index) => {
                        return (
                            <li key={index}>
                                <h4>{field.title}</h4>
                                <p>{field.content}</p>
                            </li>
                        )
                    })
                }
            </ol>
        </>
    );
}

export default CopyrightPage;
