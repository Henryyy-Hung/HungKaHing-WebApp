import styles from './index.module.css';
import {Link} from '@/i18n/routing'

const SideBarCard = ({children, title, isFullSize, ...props}) => {

    return (
        <div
            className={`${styles.container} ${isFullSize ? styles.fullSize : ''}`.trim()}
            {...props}
        >
            <h3 className={styles.title}>
                {title}
            </h3>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}

export default SideBarCard;