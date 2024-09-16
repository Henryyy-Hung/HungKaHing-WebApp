import styles from './loading.module.css'
import IconTubeSpinner from "@/assets/vectors/IconTubeSpinner";

const Loading = () => {
    return (
        <div className={styles.container}>
            <IconTubeSpinner />
        </div>
    );
}

export default Loading;