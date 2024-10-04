import styles from './index.module.css';
import avatar from '@/assets/images/avatar/cat.jpg'
import Image from 'next/image'
import {useTranslations} from "next-intl";
import timeUtil from "@/utils/timeUtil";

const PostHeader = ({title, author, tags, publishDate, lastEditDate, readingTime}) => {

    const t = useTranslations('blog.post');

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
                        <h4>{author}</h4>
                    </div>
                    <div>
                        {`${t('labels.published')} ${timeUtil.convertToDateOnly(publishDate)}`}
                        &nbsp;&nbsp;•&nbsp;&nbsp;
                        {`${t('labels.updated')} ${timeUtil.convertToDateOnly(lastEditDate)}`}
                        &nbsp;&nbsp;•&nbsp;&nbsp;
                        {`${readingTime} ${t('labels.readTime')}`}
                    </div>
                </div>

            </div>


        </header>
    )
}

export default PostHeader