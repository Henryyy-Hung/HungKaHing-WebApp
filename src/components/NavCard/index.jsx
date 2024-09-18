import styles from './index.module.css';
import {Link} from 'src/i18n/routing'

const NavCard = ({children, className, ...props}) => {
    return (
        <Link className={`${styles.container} ${className}`} {...props}>
            {children}
        </Link>
    )
}

export default NavCard;