import {notFound} from "next/navigation";
import styles from "./page.module.css"
import BlogPostService from "@/services/blogPostService";
import TableOfContent from "@/components/shared/mdxComponents/TableOfContent";
import {Link} from "@/i18n/routing";

const generateStaticParams = async ({ params: { locale } }) => {
    const posts = await BlogPostService.getAllLocalizedMetadata({ locale });
    return posts.map(post => ({postId: post.id})) || [];
}

const BlogPage = async ({params: {locale, postId} }) => {

    const BlogComponent = await BlogPostService.getComponent({postId, locale});

    if (BlogComponent) {
        const toc = await BlogPostService.getTableOfContents({locale, postId});

        const metadata = await BlogPostService.getMetadata({postId, locale})
        return (
            <div className={styles.container}>
                <div className={styles.blogContainer}>
                    <BlogComponent />
                    <hr />
                    本作品采用
                    <a href={"https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en"}>
                        知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议
                    </a>
                    进行许可。不允许内容农场类网站、CSDN 用户和微信公众号转载。
                </div>
                <div className={styles.tocContainer}>
                    <h4>目录</h4>
                    <hr />
                    <TableOfContent toc={toc} />
                </div>
            </div>
        );
    }
    else {
        const supportedLocales = await BlogPostService.getSupportedLocalesByPostId({postId});
        if (supportedLocales.length > 0) {
            return (
                <div className={styles.container}>
                    <div className={styles.blogContainer}>
                        <h1>Current Locale is not supported</h1>
                        <p>
                            Please select one of the following locales to view the content.
                        </p>
                        {
                            supportedLocales.map((locale, index) => (
                                <Link key={index} href={`/blog/${postId}`} locale={locale} scroll={false}>
                                    <h3>{locale}</h3>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            )
        } else {
            notFound();
        }
    }
}

export default BlogPage;

export {generateStaticParams};


