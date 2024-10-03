import {notFound} from "next/navigation";
import styles from "./page.module.css"
import {Link} from "@/i18n/routing";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import BlogPostService from "@/services/blogPostService";
import TableOfContent from "src/app/[locale]/blog/post/[postId]/components/TableOfContent";
import Breadcrumb from "src/app/[locale]/blog/post/[postId]/components/Breadcrumb";
import PostHeader from "src/app/[locale]/blog/post/[postId]/components/PostHeader";
import PostFooter from "src/app/[locale]/blog/post/[postId]/components/PostFooter";
import FixedSidebarLayout from "@/components/layouts/FixedSidebarLayout";
import {localeNames} from "@/i18n/configs";

export const generateMetadata = async ({params: {locale}}) => {
    const t = await getTranslations({locale, namespace: 'blog.post'});
    return {
        title: t('title'),
    };
}

const generateStaticParams = async ({ params: { locale } }) => {
    const posts = await BlogPostService.getAllLocalizedMetadata({ locale });
    return posts.map(post => ({postId: post.id})) || [];
}

const BlogPostPage = async ({params: {locale, postId} }) => {

    unstable_setRequestLocale(locale);
    const t = await getTranslations({locale, namespace: 'blog.post'});

    const BlogComponent = await BlogPostService.getComponent({postId, locale});

    if (BlogComponent) {

        const toc = await BlogPostService.getTableOfContents({locale, postId});
        const metadata = await BlogPostService.getMetadata({postId, locale})
        const readingTime = await BlogPostService.getReadingTime({postId, locale});

        return (
            <FixedSidebarLayout
                sidebarSections={[
                    <section key={0}>
                        <h3>{t('fields.toc')}</h3>
                        <hr/>
                        <TableOfContent toc={toc}/>
                    </section>,
                    <section key={1}>
                        <h3>{t('fields.related')}</h3>
                        <hr/>
                    </section>
                ]}
            >
                <div className={styles.container}>
                    <Breadcrumb/>
                    <PostHeader
                        title={metadata.title || 'Blog Post'}
                        author={t('fields.author')}
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
                        <h2>{t('warnings.languageNotSupported')}</h2>
                        <p>
                            {
                                supportedLocales.map((locale, index) => (
                                    <Link key={index} href={`/blog/post/${postId}`} locale={locale} scroll={false}>
                                        {localeNames[locale]}
                                    </Link>
                                ))
                            }
                        </p>
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


