import {notFound} from "next/navigation";
import styles from "./page.module.css"
import BlogPostService from "@/services/blogPostService";
import TableOfContent from "@/components/shared/mdxComponents/TableOfContent";

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
        notFound();
    }
}

export default BlogPage;

export {generateStaticParams};


