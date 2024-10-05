import styles from './index.module.css'

const H3 = ({children}) => {
    return (
        <h3 className={styles.container}>{children}</h3>
    )
}

export default H3;