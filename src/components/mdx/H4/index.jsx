import styles from './index.module.css'

const H4 = ({children, ...props}) => {
    return (
        <h4
            className={styles.container}
            {...props}
        >
            {children}
        </h4>
    )
}

export default H4;