import styles from './index.module.css';
import NavCard from "@/components/card/NavCard";

const BlogPostNavCard = ({postId, locale, title, description, ...props}) => {
    return (
        <NavCard
            className={styles.container}
            href={`/blog/post/${postId}`}
            locale={locale}
            prefetch={true}
            scroll={true}
            {...props}
        >
            <h3>{title}</h3>
            <p>{description}</p>
        </NavCard>
    )
}

export default BlogPostNavCard;