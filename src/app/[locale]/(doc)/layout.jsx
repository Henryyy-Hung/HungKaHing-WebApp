import styles from './layout.module.css'
import {setRequestLocale} from "next-intl/server";

const Layout = async ({ children, params: {locale} }) => {

    setRequestLocale(locale);

    return (
        <div className={styles.container}>
            <article className={styles.article}>
                {children}
            </article>
        </div>
    );
};

export default Layout;
