import styles from "./layout.module.css";


const BlogLayout = async ({ children, params: {locale} }) => {

    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default BlogLayout;
