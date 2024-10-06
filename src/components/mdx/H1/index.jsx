import styles from './index.module.css'

const H1 = ({children, ...props}) => {
    return (
        <h1
            className={styles.container}
            {...props}
        >
            {children}
        </h1>
    )
}

export default H1;