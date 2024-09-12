import {notFound} from "next/navigation";
import styles from "./page.module.css"
import {globby} from 'globby';
import fs from 'fs';
import path from 'path';
import {supportedLocales} from "@/i18n/configs";

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
    const localizedBlogPaths = await globby(`src/blogs/${blogId}/*.mdx`);
    const blogLocales = localizedBlogPaths.map(blogPath => blogPath.split('/')[3].split('.')[0]);
    if (blogLocales.length > 0) {
        let supportedLocale = blogLocales.find(blogLocale => blogLocale === locale);
        if (!supportedLocale) supportedLocale = blogLocales.find(blogLocale => locale.startsWith(blogLocale));
        if (!supportedLocale) supportedLocale = blogLocales[0];


        const Content = (await import(`src/blogs/${blogId}/${supportedLocale}.mdx`)).default;
        const metadata = (await import(`src/blogs/${blogId}/${supportedLocale}.mdx`)).metadata;

        return (
            <div className={styles.container}>
                <h1>{metadata.title}</h1>
                <Content />
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


