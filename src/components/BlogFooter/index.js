import styles from './index.module.css'
import {useLocale} from "next-intl";


const BlogFooter = () => {

    const locale = useLocale();

    return (
        <div className={styles.container}>
            <hr/>
            本作品采用
            <a href={"https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en"}>
                知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议
            </a>
            进行许可。不允许内容农场类网站、CSDN 用户和微信公众号转载。
        </div>
    )
}

export default BlogFooter;