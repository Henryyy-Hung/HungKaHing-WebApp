import styles from './layout.module.css'
import {unstable_setRequestLocale} from "next-intl/server";

const Layout = async ({ children, params: {locale} }) => {

    unstable_setRequestLocale(locale);

    return (
        <div className={styles.container}>
            <article className={styles.article}>
                {children}
            </article>
        </div>
    );
};

export default Layout;
