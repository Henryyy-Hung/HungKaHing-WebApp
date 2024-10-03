import style from './page.module.css';
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import PageTitleCard from "src/components/card/PageTitleCard";
import terminal from "@/assets/images/background/terminal.png";

export const generateMetadata = async ({params: {locale}}) => {
    const t = await getTranslations({locale, namespace: 'projects'});
    return {
        title: t('title'),
    };
}

const ProjectsPage = async ({ params: { locale } }) => {

    unstable_setRequestLocale(locale);

    const t = await getTranslations('projects', locale);

    return (
        <div className={style.container}>
            <PageTitleCard
                locale={locale}
                image={terminal}
                title={t('title')}
                description={t('description')}
            />
            <h1>Building in Progress......</h1>
        </div>
    );
}

export default ProjectsPage;