import {notFound} from "next/navigation";
import styles from "./page.module.css"
import {Link} from "@/i18n/routing";
import {getTranslations, setRequestLocale} from "next-intl/server";
import FixedSidebarLayout from "@/components/layouts/FixedSidebarLayout";
import TableOfContent from "./_components/TableOfContent";
import PostHeader from "./_components/PostHeader";
import PostFooter from "./_components/PostFooter";
import {
    getBlogPostComponent,
    getBlogPostMetadata,
    getBlogPostMetadataByLocale,
    getSupportedLocalesByBlogPostId
} from "@/blog/service";
import SideBarCard from "@/components/card/SideBarCard";
import {I18nLocale} from "@/constants/i18nLocale";

export const generateMetadata = async ({params: {locale}}) => {
    const t = await getTranslations({locale, namespace: 'blog.post'});
    return {
        title: t('title'),
    };
}

const generateStaticParams = async ({ params: { locale } }) => {
    const posts = await getBlogPostMetadataByLocale({ locale });
    return posts.map(post => ({postId: post.id})) || [];
}

const BlogPostPage = async ({params: {locale, postId} }) => {

    setRequestLocale(locale);
    const t = await getTranslations({locale, namespace: 'blog.post'});

    const BlogComponent = await getBlogPostComponent({postId, locale});

    if (BlogComponent) {
        const metadata = await getBlogPostMetadata({postId, locale})

        return (
            <FixedSidebarLayout
                sidebarSections={[
                    <SideBarCard
                        title={t('labels.toc')}
                        key={0}
                    >
                        <TableOfContent toc={metadata.tableOfContents}/>
                    </SideBarCard>,
                    <SideBarCard
                        title={t('labels.related')}
                        key={1}
                    >
                    </SideBarCard>
                ]}
            >
                <div className={styles.container}>
                    <PostHeader
                        title={metadata.title || 'Blog Post'}
                        author={t('labels.author')}
                        tags={metadata.tags || []}
                        publishDate={metadata.publishDate || String(new Date())}
                        lastEditDate={metadata.lastEditDate || String(new Date())}
                        readingTime={metadata.readingTime || 0}
                    />
                    <div>
                        <BlogComponent />
                    </div>
                    <PostFooter />
                </div>
            </FixedSidebarLayout>
        );
    } else {
        const supportedLocaleIsoCodes = await getSupportedLocalesByBlogPostId({postId});
        if (supportedLocaleIsoCodes.length > 0) {
            return (
                <div className={styles.container}>
                    <div className={styles.dialogue}>
                        <h2>{t('warnings.languageNotSupported')}</h2>
                        <p>
                            {
                                supportedLocaleIsoCodes.map((localeIsoCode, index) => (
                                    <Link key={index} href={`/blog/post/${postId}`} locale={localeIsoCode} scroll={false}>
                                        {I18nLocale.getLocaleByIsoCode(localeIsoCode).nameInLocal}
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


