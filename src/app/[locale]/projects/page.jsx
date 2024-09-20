import style from './page.module.css';
import {unstable_setRequestLocale} from "next-intl/server";
import PageTitleCard from "@/components/PageTitleCard";
import terminal from "@/assets/images/background/terminal.png";

export const generateMetadata = async ({params: {locale}}) => {
    return {
        title: 'Projects',
    };
}

const ProjectsPage = ({ params: { locale } }) => {

    unstable_setRequestLocale(locale);

    return (
        <div className={style.container}>
            <PageTitleCard
                locale={locale}
                image={terminal}
                title={'Projects'}
                description={'Some of my memorable projects.'}
            />
            <h1>In Progress......</h1>
        </div>
    );
}

export default ProjectsPage;