import styles from './index.module.css';
import {Link} from 'src/i18n/routing'

const NavCard = ({children, className, ...props}) => {
    const {href, ...rest} = props;
    return (
        (href) ? (
            <Link
                className={`${className} ${styles.container}`}
                href={href}
                {...rest}
            >
                {children}
            </Link>
        ) : (
            <div className={`${className} ${styles.container}`} {...rest}>
                {children}
            </div>
        )
    )
}

export default NavCard;