import styles from './index.module.css'

const H3 = ({children, ...props}) => {
    return (
        <h3
            className={styles.container}
            {...props}
        >
            {children}
        </h3>
    )
}

export default H3;