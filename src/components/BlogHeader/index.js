import styles from './index.module.css';
import avatar from '@/assets/images/avatar.jpg'
import Image from 'next/image'

const BlogHeader = ({title, author, tags, publishDate, lastEditDate, readingTime}) => {

    return (
        <header className={styles.container}>

            <h1>{title}</h1>

            <p className={styles.tags}>
                {tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                        {tag}&nbsp;
                    </span>
                ))}
            </p>

            <div className={styles.info}>

                <div className={styles.left}>
                    <Image src={avatar} alt="Henry Hung" className={styles.avatar} width={64} height={64}/>
                </div>

                <div className={styles.right}>
                    <div>
                        <span>{author}</span>
                    </div>
                    <div>
                        Published: {publishDate}&nbsp;&nbsp;•&nbsp;&nbsp;Updated: {lastEditDate}&nbsp;&nbsp;•&nbsp;&nbsp;{readingTime} mins read
                    </div>
                </div>

            </div>


        </header>
    )
}

export default BlogHeader