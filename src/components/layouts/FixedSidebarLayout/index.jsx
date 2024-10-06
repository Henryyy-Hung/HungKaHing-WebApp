import styles from './index.module.css';

const FixedSidebarLayout = ({children, sidebarSections, className, ...props}) => {

    return (
        <div className={`${styles.container} ${className}`} {...props}>

            <article className={styles.content}>
                {children}
            </article>
            <aside className={styles.sidebar}>
                {sidebarSections}
            </aside>
        </div>
    )
}

export default FixedSidebarLayout;