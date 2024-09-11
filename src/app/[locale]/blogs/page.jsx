import style from './page.module.css';
import {globby} from "globby";
import {Link} from "@/i18n/routing";

export const dynamic = 'force-dynamic';

const BlogsPage = async ({ params: { locale } }) => {

    const blogPaths = await globby(`src/blogs/*/*.mdx`);
    let blogIds = blogPaths.map(blogPath => blogPath.split('/')[2]);
    blogIds = [...new Set(blogIds)];

    return (
        <div className={style.container}>
            {
                blogIds.map(blogId => (
                    <Link href={`/blogs/${blogId}`} key={blogId} className={style.card} locale={locale} prefetch={false}>
                        {blogId}
                    </Link>
                ))
            }
        </div>
    );
}

export default BlogsPage;