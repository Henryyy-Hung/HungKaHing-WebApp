import styles from './index.module.css'

const H6 = ({children}) => {
    return (
        <h1 className={styles.container}>{children}</h1>
    )
}

export default H6;