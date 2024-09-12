import {notFound} from "next/navigation";
import styles from "./page.module.css"
import {globby} from 'globby';
import fs from 'fs';
import path from 'path';
import {getBlogContent} from "@/utils/BlogUtil";

const getContent = async (blogId, locale) => {
    const filePath = path.join(process.cwd(), `src/blogs/${blogId}/${locale}.mdx`);
    return fs.readFileSync(filePath, 'utf8');
};

const generateStaticParams = async () => {
    const blogPaths = await globby(`src/blogs/*/*.mdx`);
    const blogIds = blogPaths.map(blogPath => blogPath.split('/')[2]);
    return blogIds.map(blogId => ({blogId})) || [];
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

const dynamicParams = false

export default BlogPage;

export {
    generateStaticParams,
    // dynamicParams
};


