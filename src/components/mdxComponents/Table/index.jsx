import styles from './index.module.css'
import React from "react";

const Table = ({ children }) => {
    return (
        <table className={styles.container}>
            {children}
        </table>
    )
}

export default Table;