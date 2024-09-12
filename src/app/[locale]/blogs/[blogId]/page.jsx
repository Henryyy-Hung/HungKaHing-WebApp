import {notFound} from "next/navigation";
import styles from "./page.module.css"
import {globby} from 'globby';
import {getBlogList, getBlogContent} from "@/utils/BlogUtil";

const generateStaticParams = async () => {
    const blogList = await getBlogList();
    return blogList.map(blog => ({blogId: blog.id})) || [];
}

const BlogPage = async ({params: {locale, blogId} }) => {
    const BlogContent = await getBlogContent(blogId, locale);
    if (BlogContent) {
        return (
            <div className={styles.container}>
                <BlogContent />
            </div>
        );
    }
    else {
        notFound();
    }
}

export default BlogPage;

export {generateStaticParams};


