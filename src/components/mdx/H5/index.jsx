import styles from './index.module.css'

const H5 = ({children, ...props}) => {
    return (
        <h5
            className={styles.container}
            {...props}
        >
            {children}
        </h5>
    )
}

export default H5;