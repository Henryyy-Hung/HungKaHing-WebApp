import style from './page.module.css';
import {unstable_setRequestLocale} from "next-intl/server";

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