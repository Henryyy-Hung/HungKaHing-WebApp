import styles from './index.module.css'

const H4 = ({children}) => {
    return (
        <h1 className={styles.container}>{children}</h1>
    )
}

export default H4;