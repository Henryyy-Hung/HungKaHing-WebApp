import styles from './loading.module.css'
import IconTubeSpinner from "@/assets/vectors/IconTubeSpinner";

const Loading = () => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <IconTubeSpinner />
            </div>
        </div>
    );
}

export default Loading;