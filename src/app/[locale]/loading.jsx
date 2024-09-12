import styles from "./loading.module.css";

const Loading = () => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Loading...</h1>
            </div>
        </div>
    );
}

export default Loading;