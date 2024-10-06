import styles from './index.module.css'

const H2 = ({children, ...props}) => {
    return (
        <h2
            className={styles.container}
            {...props}
        >
            {children}
        </h2>
    )
}

export default H2;