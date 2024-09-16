import {notFound} from "next/navigation";
import styles from "./page.module.css"
import BlogPostService from "@/services/blogPostService";
import TableOfContent from "@/components/mdxComponents/TableOfContent";
import {Link} from "@/i18n/routing";
import Breadcrumb from "src/components/Breadcrumb";
import BlogHeader from "@/components/BlogHeader";
import BlogFooter from "@/components/BlogFooter";

const generateStaticParams = async ({ params: { locale } }) => {
    const posts = await BlogPostService.getAllLocalizedMetadata({ locale });
    return posts.map(post => ({postId: post.id})) || [];
}

const BlogPage = async ({params: {locale, postId} }) => {

    const BlogComponent = await BlogPostService.getComponent({postId, locale});

    if (BlogComponent) {

        const toc = await BlogPostService.getTableOfContents({locale, postId});
        const metadata = await BlogPostService.getMetadata({postId, locale})
        const readingTime = await BlogPostService.getReadingTime({postId, locale});

        return (
            <div className={styles.container}>

                <article className={styles.blogContainer}>

                    <Breadcrumb />

                    <BlogHeader
                        title={metadata.title || 'Blog Post'}
                        author={'Henry Hung'}
                        tags={metadata.tags || []}
                        publishDate={metadata.publishDate || String(new Date())}
                        lastEditDate={metadata.lastEditDate || String(new Date())}
                        readingTime={readingTime || 0}
                    />

                    <BlogComponent />

                    <BlogFooter />

                </article>

                <aside className={styles.tocContainer}>
                    <h3>目录</h3>
                    <hr />
                    <TableOfContent toc={toc} />
                </aside>

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


