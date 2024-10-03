import styles from './index.module.css';
import {Link} from '@/i18n/routing'

const NavCard = ({children, className, href, prefetch, scroll, ...props}) => {

    return (
        (href) ? (
            <Link
                className={`${className} ${styles.container}`}
                href={href}
                prefetch={prefetch}
                scroll={scroll}
                {...props}
            >
                {children}
            </Link>
        ) : (
            <div
                className={`${className} ${styles.container}`}
                {...props}
            >
                {children}
            </div>
        )
    )
}

export default NavCard;