import styles from './index.module.css'
import {useLocale, useTranslations} from "next-intl";


const PostFooter = () => {

    const t = useTranslations('blog.post');

    return (
        <div className={styles.container}>
            {t.rich('warnings.license')}
        </div>
    )
}
// 本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议进行许可。不允许内容农场类网站、CSDN 用户和微信公众号转载。

export default PostFooter;