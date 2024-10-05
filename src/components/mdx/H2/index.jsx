import styles from './index.module.css'

const H2 = ({children}) => {
    return (
        <h2 className={styles.container}>{children}</h2>
    )
}

export default H2;