import styles from './page.module.css';
import {unstable_setRequestLocale} from "next-intl/server";
import FixedSidebarLayout from "@/components/layouts/FixedSidebarLayout";
import {Link} from "@/i18n/routing";
import IconArrowToLeft from "@/assets/vectors/IconArrowToLeft";
import Pagination from "@/components/nav/Pagination";


const generateStaticParams = async ({ params: { locale, categoryId } }) => {
    return [{pageNumber: '1'}]
}

const BlogCategoryPage = ({params: {locale, categoryId, pageNumber} }) => {

    unstable_setRequestLocale(locale);

    const numberOfPages = 32;

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
                    <h1>博客文章</h1>
                </div>

                <div className={styles.content}>
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