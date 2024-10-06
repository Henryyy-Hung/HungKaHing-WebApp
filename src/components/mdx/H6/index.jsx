import styles from './index.module.css'

const H6 = ({children, ...props}) => {
    return (
        <h6
            className={styles.container}
            {...props}
        >
            {children}
        </h6>
    )
}

export default H6;