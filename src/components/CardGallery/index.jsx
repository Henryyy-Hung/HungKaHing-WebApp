import styles from './index.module.css';

const CardGallery = ({children, className, numOfColumn='auto-fill', minWidth='21rem', ...props}) => {
    return (
        <div
            className={`${styles.container} ${className}`}
            style={{
                gridTemplateColumns: `repeat(${numOfColumn}, minmax(${minWidth}, 1fr))`
            }}
            {...props}
        >
            {children}
        </div>
    )
}

export default CardGallery;