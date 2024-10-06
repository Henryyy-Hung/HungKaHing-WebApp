import styles from './page.module.css';
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";
import FixedSidebarLayout from "@/components/layouts/FixedSidebarLayout";
import {Link} from "@/i18n/routing";
import IconArrowToLeft from "@/assets/vectors/IconArrowToLeft";
import Pagination from "@/components/nav/Pagination";
import {getBlogPostMetadataByLocaleAndCategory} from "@/blog/service";
import TimeUtil from "@/utils/timeUtil";
import {ITEMS_PER_PAGE} from "@/blog/configs";
import CategorySideBar from "@/app/[locale]/blog/category/[categoryId]/page/[pageNumber]/_components/CategorySideBar";

const BlogGalleryPage = async ({params: {locale, categoryId, pageNumber} }) => {

    unstable_setRequestLocale(locale);

    const t = await getTranslations('blog', locale);

    const blogPostMetadataList = await getBlogPostMetadataByLocaleAndCategory({locale, categoryId});
    const displayedBlogPostMetadataList = blogPostMetadataList.slice((pageNumber - 1) * ITEMS_PER_PAGE, pageNumber * ITEMS_PER_PAGE);
    const numberOfPages = Math.ceil(blogPostMetadataList.length / ITEMS_PER_PAGE) || 1;

    return (
        <FixedSidebarLayout
            sidebarSections={[
                <CategorySideBar locale={locale} categoryId={categoryId} key={0} />,
            ]}
        >
            <div className={styles.container}>

                <div className={styles.header}>
                    <Link className={styles.backButton} href={`/blog`} locale={locale}>
                        <IconArrowToLeft />
                        返回
                    </Link>
                    <h1 className={styles.title}>
                        博客文章
                    </h1>
                </div>

                <div className={styles.content}>
                    {
                        (displayedBlogPostMetadataList.length > 0) ? (
                            displayedBlogPostMetadataList.map((metadata, index) => {
                                const postId = metadata.id;
                                const postTitle = metadata.title;
                                const postDescription = metadata.description;
                                const postTags = metadata.tags;
                                const postPublishDate = metadata.publishDate || String(new Date());
                                return (
                                    <article key={index} className={styles.post}>
                                        <Link href={`/blog/post/${postId}`} locale={locale} className={styles.title}>
                                            {postTitle}
                                        </Link>
                                        <p className={styles.description}>
                                            {postDescription}
                                        </p>
                                        <div className={styles.misc}>
                                            <div className={styles.tags}>
                                                {
                                                    Array.isArray(postTags) && postTags.map((tag, index) => (
                                                        <span key={index} className={styles.tag}>
                                                        {tag}
                                                    </span>
                                                    ))
                                                }
                                            </div>
                                            <span className={styles.publishDate}>
                                            {TimeUtil.convertToDateOnly(postPublishDate)}
                                        </span>
                                        </div>
                                    </article>
                                )
                            })
                        ) : (
                            <p className={styles.warning}>
                                没有文章
                            </p>
                        )
                    }
                </div>

                <div className={styles.footer}>
                    <Pagination
                        numberOfPages={numberOfPages}
                        currentPage={parseInt(pageNumber)}
                        siblingCount={2}
                        boundaryCount={1}
                        PageLink={({page, children, ...props}) => (
                            <Link
                                href={`/blog/category/${categoryId}/page/${page}`}
                                {...props}
                            >
                                {children}
                            </Link>
                        )}
                    />
                </div>

            </div>
        </FixedSidebarLayout>
    );
}

export default BlogGalleryPage;

