import style from './page.module.css';
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import PageTitleCard from "src/components/card/PageTitleCard";
import forest from "@/assets/images/background/forest.png";
import {useTranslations} from "next-intl";

export const generateMetadata = async ({params: {locale}}) => {
    const t = await getTranslations({locale, namespace: 'about'});
    return {
        title: t('title'),
    };
}

const AboutPage = ({ params: { locale } }) => {

    unstable_setRequestLocale(locale);
    const t = useTranslations('about');

    return (
        <div className={style.container}>

            <PageTitleCard
                locale={locale}
                image={forest}
                title={t('title')}
                description={t('description')}
            />
            <h1>Building in Progress......</h1>
        </div>
    );
}

export default AboutPage;