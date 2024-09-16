import style from './page.module.css';
import {unstable_setRequestLocale} from "next-intl/server";

export const generateMetadata = async ({params: {locale}}) => {
    return {
        title: 'Projects',
    };
}

const ProjectsPage = ({ params: { locale } }) => {

    unstable_setRequestLocale(locale);

    return (
        <div className={style.container}>
            <div className={style.card}>
                <h5>Project Page in progress</h5>
            </div>
        </div>
    );
}

export default ProjectsPage;