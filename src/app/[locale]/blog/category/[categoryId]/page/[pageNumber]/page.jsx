import styles from './page.module.css';
import {unstable_setRequestLocale} from "next-intl/server";
import FixedSidebarLayout from "@/components/layouts/FixedSidebarLayout";
import {Link} from "@/i18n/routing";
import IconArrowToLeft from "@/assets/vectors/IconArrowToLeft";
import Pagination from "@/components/nav/Pagination";
import {getBlogPostMetadataByLocaleAndCategory} from "@/blog/service";

const itemPerPage = 10;

const generateStaticParams = async ({ params: { locale, categoryId } }) => {
    const blogPostMetadataList = await getBlogPostMetadataByLocaleAndCategory({locale, categoryId});
    const numberOfPages = Math.ceil(blogPostMetadataList.length / itemPerPage) || 1;
    return (
        Array.from({length: numberOfPages}, (v, i) => {
            return {
                pageNumber: (i + 1).toString(),
            }
        })
    )
}

const BlogCategoryPage = async ({params: {locale, categoryId, pageNumber} }) => {

    const blogPostMetadataList = await getBlogPostMetadataByLocaleAndCategory({locale, categoryId});
    const numberOfPages = Math.ceil(blogPostMetadataList.length / itemPerPage) || 1;

    unstable_setRequestLocale(locale);

    return (
        <FixedSidebarLayout
            sidebarSections={[
                (
                    <section key={0}>
                        <h3>Categories</h3>
                        <hr/>
                    </section>
                ),
                (
                    <section key={1}>
                        <h3>Popular tags</h3>
                        <hr/>
                    </section>
                )
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
                        blogPostMetadataList.slice((pageNumber - 1) * itemPerPage, pageNumber * itemPerPage).map((metadata, index) => {
                            const postId = metadata.id;
                            const postTitle = metadata.title;
                            const postDescription = metadata.description;
                            const postTags = metadata.tags;
                            const postPublishDate = metadata.publishDate;
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
                                            {postPublishDate}
                                        </span>
                                    </div>
                                </article>
                            )
                        })
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
                                scroll={false}
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

export default BlogCategoryPage;

export {generateStaticParams};