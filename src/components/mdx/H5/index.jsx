import styles from './index.module.css'

const H5 = ({children}) => {
    return (
        <h5 className={styles.container}>{children}</h5>
    )
}

export default H5;