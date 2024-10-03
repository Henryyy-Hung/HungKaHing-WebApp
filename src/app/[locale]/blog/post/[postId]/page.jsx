import {notFound} from "next/navigation";
import styles from "./page.module.css"
import {Link} from "@/i18n/routing";
import {unstable_setRequestLocale} from "next-intl/server";
import BlogPostService from "@/services/blogPostService";
import TableOfContent from "src/app/[locale]/blog/post/[postId]/components/TableOfContent";
import Breadcrumb from "src/app/[locale]/blog/post/[postId]/components/Breadcrumb";
import PostHeader from "src/app/[locale]/blog/post/[postId]/components/PostHeader";
import PostFooter from "src/app/[locale]/blog/post/[postId]/components/PostFooter";
import FixedSidebarLayout from "@/components/layouts/FixedSidebarLayout";

export const generateMetadata = async ({params: {locale}}) => {
    return {
        title: 'Blog Post',
    };
}

const generateStaticParams = async ({ params: { locale } }) => {
    const posts = await BlogPostService.getAllLocalizedMetadata({ locale });
    return posts.map(post => ({postId: post.id})) || [];
}

const BlogPostPage = async ({params: {locale, postId} }) => {

    unstable_setRequestLocale(locale);

    const BlogComponent = await BlogPostService.getComponent({postId, locale});

    if (BlogComponent) {

        const toc = await BlogPostService.getTableOfContents({locale, postId});
        const metadata = await BlogPostService.getMetadata({postId, locale})
        const readingTime = await BlogPostService.getReadingTime({postId, locale});

        return (
            <FixedSidebarLayout
                sidebarSections={[
                    <section key={0}>
                        <h3>目录</h3>
                        <hr/>
                        <TableOfContent toc={toc}/>
                    </section>,
                    <section key={1}>
                        <h3>相关文章</h3>
                        <hr/>
                        <Link href={`/blog`} locale={locale}>
                            <h4>更多文章</h4>
                        </Link>
                    </section>
                ]}
            >
                <div className={styles.container}>
                    <Breadcrumb/>
                    <PostHeader
                        title={metadata.title || 'Blog Post'}
                        author={'Henry Hung'}
                        tags={metadata.tags || []}
                        publishDate={metadata.publishDate || String(new Date())}
                        lastEditDate={metadata.lastEditDate || String(new Date())}
                        readingTime={readingTime || 0}
                    />
                    <div>
                        <BlogComponent />
                    </div>
                    <PostFooter />
                </div>
            </FixedSidebarLayout>
        );
    } else {
        const supportedLocales = await BlogPostService.getSupportedLocalesByPostId({postId});
        if (supportedLocales.length > 0) {
            return (
                <div className={styles.container}>
                    <div className={styles.dialogue}>
                        <h2>Current Locale is not supported, select another one:</h2>
                        {
                            supportedLocales.map((locale, index) => (
                                <Link key={index} href={`/blog/post/${postId}`} locale={locale} scroll={false}>
                                    {locale}
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

export default BlogPostPage;

export {generateStaticParams};


